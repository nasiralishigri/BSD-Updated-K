// SPDX-License-Identifier: GPLv3

pragma solidity ^0.8.6;

import "./SafeMath.sol";
import "./IERC20.sol";

contract GLX {
    using SafeMath for uint256; 
    uint256 private constant baseDivider = 10000;
    uint256 private constant feePercents = 200;
    uint256 private constant minDeposit = 100e6;
    uint256 private constant maxDeposit = 5000e6;
    uint256 private constant baseDeposit = 1000e6;
    uint256 private constant splitPercents = 2100;
    uint256 private constant transferFeePercents = 1000;

    uint256 private constant timeStep = 1 days;
    uint256 private constant dayPerCycle = 15 days; 
    uint256 private constant dayRewardPercents = 150;
    uint256 private constant maxAddFreeze = 45 days;
    uint256 private constant referDepth = 15;
    uint256[15] private invitePercents = [500, 100, 200, 300, 100, 100, 100, 100, 100, 100, 50, 50, 50, 50, 50];
    uint256[5] private levelDeposit = [100e6, 1000e6, 2000e6, 3000e6, 5000e6];
    uint256[5] private levelInvite = [0, 10000e6, 20000e6, 30000e6, 100000e6];
    uint256[5] private levelTeam = [0, 30, 50, 100, 300];

    uint256[3] private balReached = [100e10, 500e10, 1000e10];
    uint256[3] private balFreezeStatic = [70e10, 300e10, 500e10];
    uint256[3] private balFreezeDynamic = [40e10, 150e10, 200e10];
    uint256[3] private balRecover = [150e10, 500e10, 1000e10];
    uint256 private constant poolPercents = 50;
    uint256 private constant luckMinDeposit = 500e6;
    uint256 private constant maxSearchDepth = 3000;

    IERC20 private stableToken;
    address private multiSig;
    address private defaultRefer;
    uint256 private startTime;
    uint256 private lastDistribute;
    uint256 private totalUsers; 
    uint256 private luckPool;
    mapping(uint256=>uint256) private dayNewbies;
    mapping(uint256=>uint256) private dayDeposit;
    mapping(uint256=>address[]) private dayLuckUsers;
    mapping(uint256=>uint256[]) private dayLuckUsersDeposit;
    address[] private depositors;
    mapping(uint256=>bool) private balStatus;
    bool private freezeStaticReward;
    bool private freezeDynamicReward;

    struct UserInfo {
        address referrer;
        uint256 level;
        uint256 maxDeposit;
        uint256 maxDepositable;
        uint256 teamNum;
        uint256 teamTotalDeposit;
        uint256 totalFreezed;
        uint256 totalRevenue;
        uint256 unfreezeIndex;
        bool unfreezedDynamic;
    }

    struct RewardInfo{
        uint256 capitals;
        uint256 statics;
        uint256 invited;
        uint256 level5Freezed;
        uint256 level5Released;
        uint256 luckWin;
        uint256 split;
    }

    struct OrderInfo {
        uint256 amount;
        uint256 start;
        uint256 unfreeze; 
        bool isUnfreezed;
    }
    
    mapping(address=>UserInfo) private userInfo;
    mapping(address=>RewardInfo) private rewardInfo;
    mapping(address=>OrderInfo[]) private orderInfos;
    mapping(address=>mapping(uint256=>uint256)) private userCycleMax;
    mapping(address=>mapping(uint256=>address[])) private teamUsers;

    event Register(address user, address referral);
    event Deposit(address user, uint256 amount);
    event DepositBySplit(address user, uint256 amount);
    event TransferBySplit(address user, uint256 subBal, address receiver, uint256 amount);
    event Withdraw(address user, uint256 withdrawable);
    event DistributePoolRewards(uint256 day, uint256 time);

    constructor(address _stableToken, address _defaultRefer, address _multiSig, uint256 _startTime) {
        stableToken = IERC20(_stableToken);
        defaultRefer = _defaultRefer;
        multiSig = _multiSig;
        startTime = _startTime;
        lastDistribute = _startTime;
    }

    function register(address _referral) external {
        require(userInfo[_referral].maxDeposit > 0 || _referral == defaultRefer, "invalid refer");
        UserInfo storage user = userInfo[msg.sender];
        require(user.referrer == address(0), "referrer bonded");
        user.referrer = _referral;
        emit Register(msg.sender, _referral);
    }

    function deposit(uint256 _amount) external {
        stableToken.transferFrom(msg.sender, address(this), _amount);
        _deposit(msg.sender, _amount, true);
        emit Deposit(msg.sender, _amount);
    }

    function depositBySplit(uint256 _amount) external {
        require(userInfo[msg.sender].maxDeposit == 0, "actived");
        require(rewardInfo[msg.sender].split >= _amount, "insufficient split");
        rewardInfo[msg.sender].split = rewardInfo[msg.sender].split.sub(_amount);
        _deposit(msg.sender, _amount, false);
        emit DepositBySplit(msg.sender, _amount);
    }

    function transferBySplit(address _receiver, uint256 _amount) external {
        uint256 subBal = _amount.add(_amount.mul(transferFeePercents).div(baseDivider));
        require(_amount >= minDeposit && _amount.mod(minDeposit) == 0, "amount err");
        require(rewardInfo[msg.sender].split >= subBal, "insufficient split");
        rewardInfo[msg.sender].split = rewardInfo[msg.sender].split.sub(subBal);
        rewardInfo[_receiver].split = rewardInfo[_receiver].split.add(_amount);
        emit TransferBySplit(msg.sender, subBal, _receiver, _amount);
    }

    function withdraw() external {
        (uint256 withdrawable, uint256 split) = _calCurRewards(msg.sender);
        RewardInfo storage userRewards = rewardInfo[msg.sender];
        userRewards.statics = 0;
        userRewards.invited = 0;
        userRewards.level5Released = 0;
        userRewards.luckWin = 0;
        userRewards.split = userRewards.split.add(split);
        withdrawable = withdrawable.add(userRewards.capitals);
        userRewards.capitals = 0;
        stableToken.transfer(msg.sender, withdrawable);
        uint256 bal = stableToken.balanceOf(address(this));
        _setFreezeReward(bal);
        emit Withdraw(msg.sender, withdrawable);
    }

    function distributePoolRewards() external {
        if (block.timestamp >= lastDistribute.add(timeStep)){
            uint256 dayNow = getCurDay();
            _distributeLuckPool(dayNow.sub(1));
            lastDistribute = startTime.add(dayNow.mul(timeStep));
            emit DistributePoolRewards(dayNow, lastDistribute);
        }
    }

    function _deposit(address _userAddr, uint256 _amount, bool _isLuckable) private {
        require(block.timestamp >= startTime, "Not Started");
        UserInfo storage user = userInfo[_userAddr];
        require(user.referrer != address(0), "Not Registered");
        require(_amount >= minDeposit && _amount <= maxDeposit && _amount.mod(minDeposit) == 0, "Amount error");
        require(user.maxDeposit == 0 || _amount >= user.maxDeposit, "Amount Too Small");
        _distributeDeposit(_amount);
        uint256 curCycle = getCurCycle();
        uint256 userCurMax = userCycleMax[msg.sender][curCycle];
        if (userCurMax == 0) {
            if (curCycle == 0 || user.maxDepositable == 0) {
                userCurMax = baseDeposit;
            } else {
                userCurMax = user.maxDepositable;
            }
            userCycleMax[msg.sender][curCycle] = userCurMax;
        }
        require(_amount <= userCurMax, "Amount Too Much");
        if (_amount == userCurMax) {
            if (userCurMax >= maxDeposit) {
                userCycleMax[msg.sender][curCycle.add(1)] = maxDeposit;
            } else {
                userCycleMax[msg.sender][curCycle.add(1)] = userCurMax.add(baseDeposit);
            }
        } else {
            userCycleMax[msg.sender][curCycle.add(1)] = userCurMax;
        }
        user.maxDepositable = userCycleMax[msg.sender][curCycle.add(1)];

        uint256 dayNow = getCurDay();
        bool isNewbie;
        if (user.maxDeposit == 0) {
            isNewbie = true;
            user.maxDeposit = _amount;
            dayNewbies[dayNow] = dayNewbies[dayNow].add(1);
            totalUsers = totalUsers.add(1);
            if (_isLuckable && _amount >= luckMinDeposit && dayLuckUsers[dayNow].length < 10) {
                dayLuckUsers[dayNow].push(_userAddr);
                dayLuckUsersDeposit[dayNow].push(_amount);
            }
        } else if (_amount > user.maxDeposit){
            user.maxDeposit = _amount;
        }
        user.totalFreezed = user.totalFreezed.add(_amount);
        uint256 addFreeze = (orderInfos[_userAddr].length).mul(timeStep);
        if (addFreeze > maxAddFreeze) {
            addFreeze = maxAddFreeze;
        }
        uint256 unfreezeTime = block.timestamp.add(dayPerCycle).add(addFreeze);
        orderInfos[_userAddr].push(OrderInfo(_amount, block.timestamp, unfreezeTime, false));
        dayDeposit[dayNow] = dayDeposit[dayNow].add(_amount);
        depositors.push(_userAddr);
        _unfreezeCapitalOrReward(msg.sender, _amount);
        _updateUplineReward(msg.sender, _amount);
        _updateTeamInfos(msg.sender, _amount, isNewbie);
        _updateLevel(msg.sender);
        uint256 bal = stableToken.balanceOf(address(this));
        _balActived(bal);
        if (freezeStaticReward || freezeDynamicReward) {
            _setFreezeReward(bal);
        } else if (user.unfreezedDynamic) {
            user.unfreezedDynamic = false;
        }
    }

    function _distributeDeposit(uint256 _amount) private {
        uint256 totalFee = _amount.mul(feePercents).div(baseDivider);

        stableToken.transfer(multiSig, totalFee);
        uint256 poolAmount = _amount.mul(poolPercents).div(baseDivider);
        luckPool = luckPool.add(poolAmount);
    }

    function _updateLevel(address _userAddr) private {
        UserInfo storage user = userInfo[_userAddr];
        for (uint256 i = user.level; i < levelDeposit.length; i++){
            if (user.maxDeposit >= levelDeposit[i]) {
                (uint256 maxTeam, uint256 otherTeam) = getTeamDeposit(_userAddr);
                if (maxTeam >= levelInvite[i] && otherTeam >= levelInvite[i] && user.teamNum >= levelTeam[i]){
                    user.level = i + 1;
                }
            }
        }
    }

    function _unfreezeCapitalOrReward(address _userAddr, uint256 _amount) private {
        UserInfo storage user = userInfo[_userAddr];
        RewardInfo storage userRewards = rewardInfo[_userAddr];
        OrderInfo storage order = orderInfos[_userAddr][user.unfreezeIndex];
        if (order.isUnfreezed == false && block.timestamp >= order.unfreeze && _amount >= order.amount) {
            order.isUnfreezed = true;
            user.unfreezeIndex = user.unfreezeIndex.add(1);
            _removeInvalidDeposit(_userAddr, order.amount);
            uint256 staticReward = order.amount.mul(dayRewardPercents).mul(dayPerCycle).div(timeStep).div(baseDivider);
            if (freezeStaticReward) {
                if (user.totalFreezed > user.totalRevenue){
                    uint256 leftCapital = user.totalFreezed.sub(user.totalRevenue);
                    if (staticReward > leftCapital) {
                        staticReward = leftCapital;
                    }
                } else {
                    staticReward = 0;
                }
            }
            userRewards.capitals = userRewards.capitals.add(order.amount);
            userRewards.statics = userRewards.statics.add(staticReward);
            user.totalRevenue = user.totalRevenue.add(staticReward);
        } else if (userRewards.level5Freezed > 0) {
            uint256 release = _amount;
            if (_amount >= userRewards.level5Freezed) {
                release = userRewards.level5Freezed;
            }
            userRewards.level5Freezed = userRewards.level5Freezed.sub(release);
            userRewards.level5Released = userRewards.level5Released.add(release);
            user.totalRevenue = user.totalRevenue.add(release);
        } else if (freezeStaticReward && !user.unfreezedDynamic) {
            user.unfreezedDynamic = true;
        }
    }

    function _removeInvalidDeposit(address _userAddr, uint256 _amount) private {
        uint256 totalFreezed = userInfo[_userAddr].totalFreezed;
        userInfo[_userAddr].totalFreezed = totalFreezed > _amount ? totalFreezed.sub(_amount) : 0;
        address upline = userInfo[_userAddr].referrer;
        for (uint256 i = 0; i < referDepth; i++) {
            if (upline != address(0)) {
                userInfo[upline].teamTotalDeposit = userInfo[upline].teamTotalDeposit > _amount ? userInfo[upline].teamTotalDeposit.sub(_amount) : 0;
                if (upline == defaultRefer) {
                    break;
                }
                upline = userInfo[upline].referrer;
            } else {
                break;
            }
        }
    }

    function _updateTeamInfos(address _userAddr, uint256 _amount, bool _isNewbie) private {
        address upline = userInfo[_userAddr].referrer;
        for (uint256 i = 0; i < referDepth; i++) {
            if (upline != address(0)) {
                if (_isNewbie && _userAddr != upline) {
                    userInfo[upline].teamNum = userInfo[upline].teamNum.add(1);
                    teamUsers[upline][i].push(_userAddr);
                }
                userInfo[upline].teamTotalDeposit = userInfo[upline].teamTotalDeposit.add(_amount);
                if (upline == defaultRefer) { 
                    break;
                }
                upline = userInfo[upline].referrer;
            } else {
                break;
            }
        }
    }

    function _updateUplineReward(address _userAddr, uint256 _amount) private {
        address upline = userInfo[_userAddr].referrer;
        for (uint256 i = 0; i < referDepth; i++) {
            if (upline != address(0)) {
                if (!freezeStaticReward || userInfo[upline].totalFreezed > userInfo[upline].totalRevenue || (userInfo[upline].unfreezedDynamic && !freezeDynamicReward)) {
                    uint256 newAmount;
                    if (orderInfos[upline].length > 0) {
                        OrderInfo storage latestUpOrder = orderInfos[upline][orderInfos[upline].length.sub(1)];
                        uint256 maxFreezing = latestUpOrder.unfreeze > block.timestamp ? latestUpOrder.amount : 0;
                        if (maxFreezing < _amount) {
                            newAmount = maxFreezing;
                        } else {
                            newAmount = _amount;
                        }
                    }
                    
                    if (newAmount > 0) {
                        RewardInfo storage upRewards = rewardInfo[upline];
                        if (userInfo[upline].level > i || userInfo[upline].level == 5) {
                            uint256 reward = newAmount.mul(invitePercents[i]).div(baseDivider);
                            if (i < 4) {
                                upRewards.invited = upRewards.invited.add(reward);
                                userInfo[upline].totalRevenue = userInfo[upline].totalRevenue.add(reward);
                            } else {
                                upRewards.level5Freezed = upRewards.level5Freezed.add(reward);
                            }
                        }
                    }
                }
                if (upline == defaultRefer) {
                    break;
                }
                upline = userInfo[upline].referrer;
            } else {
                break;
            }
        }
    }

    function _balActived(uint256 _bal) private {
        for (uint256 i = balReached.length; i > 0; i--) {
            if (_bal >= balReached[i - 1]) {
                balStatus[balReached[i - 1]] = true;
                break;
            }
        }
    }

    function _setFreezeReward(uint256 _bal) private {
        for (uint256 i = balReached.length; i > 0; i--) {
            if (balStatus[balReached[i - 1]]) {
                if (_bal < balFreezeStatic[i - 1]) {
                    freezeStaticReward = true;
                    if (_bal < balFreezeDynamic[i - 1]) {
                        freezeDynamicReward = true;
                    }
                } else {
                    if ((freezeStaticReward || freezeDynamicReward) && _bal >= balRecover[i - 1]) {
                        freezeStaticReward = false;
                        freezeDynamicReward = false;
                    }
                }
                break;
            }
        }
    }

    function _calCurRewards(address _userAddr) private view returns(uint256, uint256) {
        RewardInfo storage userRewards = rewardInfo[_userAddr];
        uint256 totalRewards = userRewards.statics.add(userRewards.invited).add(userRewards.level5Released);
        uint256 splitAmt = totalRewards.mul(splitPercents).div(baseDivider);
        uint256 withdrawable = totalRewards.sub(splitAmt);
        return(withdrawable, splitAmt);
    }

    function _distributeLuckPool(uint256 _lastDay) private {
        uint256 luckTotalDeposits;
        for (uint256 i = 0; i < dayLuckUsers[_lastDay].length; i++) {
            luckTotalDeposits = luckTotalDeposits.add(dayLuckUsersDeposit[_lastDay][i]);
        }

        uint256 totalReward;
        for (uint256 i = 0; i < dayLuckUsers[_lastDay].length; i++) {
            uint256 reward = luckPool.mul(dayLuckUsersDeposit[_lastDay][i]).div(luckTotalDeposits);
            totalReward = totalReward.add(reward);
            rewardInfo[dayLuckUsers[_lastDay][i]].luckWin = rewardInfo[dayLuckUsers[_lastDay][i]].luckWin.add(reward);
            userInfo[dayLuckUsers[_lastDay][i]].totalRevenue = userInfo[dayLuckUsers[_lastDay][i]].totalRevenue.add(reward);
        }
        luckPool = luckPool > totalReward ? luckPool.sub(totalReward) : 0;
    }

    function getLuckInfos(uint256 _day) external view returns(address[] memory, uint256[] memory) {
        return(dayLuckUsers[_day], dayLuckUsersDeposit[_day]);
    }

    function getTeamDeposit(address _userAddr) public view returns(uint256, uint256){
        uint256 totalTeam;
        uint256 maxTeam;
        uint256 otherTeam;
        for (uint256 i = 0; i < teamUsers[_userAddr][0].length; i++) {
            uint256 userTotalTeam = userInfo[teamUsers[_userAddr][0][i]].teamTotalDeposit.add(userInfo[teamUsers[_userAddr][0][i]].totalFreezed);
            totalTeam = totalTeam.add(userTotalTeam);
            if (userTotalTeam > maxTeam) {
                maxTeam = userTotalTeam;
            }
            if (i >= maxSearchDepth) {
                break;
            }
        }
        otherTeam = totalTeam.sub(maxTeam);
        return(maxTeam, otherTeam);
    }

    function getCurDay() public view returns(uint256) {
        return (block.timestamp.sub(startTime)).div(timeStep);
    }

    function getCurCycle() public view returns(uint256) {
        uint256 curCycle = (block.timestamp.sub(startTime)).div(dayPerCycle);
        return curCycle;
    }

    function getDayInfos(uint256 _day) external view returns(uint256, uint256){
        return (dayNewbies[_day], dayDeposit[_day]);
    }

    function getUserInfos(address _userAddr) external view returns(UserInfo memory, RewardInfo memory, OrderInfo[] memory) {
        return (userInfo[_userAddr], rewardInfo[_userAddr], orderInfos[_userAddr]);
    }

    function getBalInfos(uint256 _bal) external view returns(bool, bool, bool) {
        return(balStatus[_bal], freezeStaticReward, freezeDynamicReward);
    }

    function getTeamUsers(address _userAddr, uint256 _layer) external view returns(address[] memory) {
        return teamUsers[_userAddr][_layer];
    }

    function getUserCycleMax(address _userAddr, uint256 _cycle) external view returns(uint256){
        return userCycleMax[_userAddr][_cycle];
    }

    function getDepositors() external view returns(address[] memory) {
        return depositors;
    }

    function getContractInfos() external view returns(address[3] memory, uint256[5] memory) {
        address[3] memory infos0;
        infos0[0] = address(stableToken);
        infos0[1] = multiSig;
        infos0[2] = defaultRefer;

        uint256[5] memory infos1;
        infos1[0] = startTime;
        infos1[1] = lastDistribute;
        infos1[2] = totalUsers;
        infos1[3] = luckPool;
        uint256 dayNow = getCurDay();
        infos1[4] = dayDeposit[dayNow];
        return (infos0, infos1);
    }
}