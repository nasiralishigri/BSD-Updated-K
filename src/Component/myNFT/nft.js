import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import common from "../Assets/nfts/common.png";
import rare from "../Assets/nfts/rare.png";
import epic from "../Assets/nfts/epic.png";
import uncommon from "../Assets/nfts/Uncommon.png";
import legendary from "../Assets/nfts/legendary.png";
import mythic from "../Assets/nfts/mythic.png";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";
import "./myNFT.css";
import { Modal } from "react-bootstrap";
import NftTransfer from "../nftTransfer/nftTransfer";
import {useSelector} from "react-redux";
import {nftAddress,nftAbi} from "../../utilities/nft";

function Items({ currentItems,nftFetch }) {
  const [show, setShow] = useState(false);
  const [nft,setNft] =useState([])
  const handleMint = async(item) => {
    console.log("handle Mint");
    setNft(item)
    setShow(true);
  };


  return (
    <div className="items row d-flex justify-content-center">
      {currentItems &&
        currentItems.map((item) => (
          <div className="col-xl-4 col-lg-6 col-sm-12 col-md-12 d-flex justify-content-center">
            <div className="row d-flex justify-content-center">
              <div className="col-10 col-md-10 col-lg-10 pic-bg-nft ">
                <img
                  src={item.imageUrl}
                  className="img-fluid mt-2 rounded mobileNftTransfer"
                  alt=""
                />
              </div>
              <div className="col-10 col-md-10 col-lg-10 d-flex justify-content-center mt-4">
                <span className="text-uppercase nftImgTitle ">
                  {item.imageName}
                </span>
              </div>
              <div className="col-10 col-md-10 col-lg-10 d-flex justify-content-center mt-2">
                {item.tokenId}
              </div>
              <div className="col-10 col-md-10 col-lg-10 d-flex justify-content-center mt-4">
                <button
                  onClick={() => {
                    handleMint(item);
                  }}
                  className="button btn_bg nftImgTransferButton"
                >
                  Transfer
                </button>
              </div>
            </div>
          </div>
        ))}
      {show && (
        <Modal
          className="model"
          show={show}
          size="xl"
          backdrop="static"
          keyboard={false}
          dialogClassName="modal-100w"
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <NftTransfer nftFetches={nftFetch}  transferNft={nft} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // We start with an empty list of items.
  let acc = useSelector((state) => state.connect?.connection);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  let [nftArray,setNftsArray]=useState([])
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const getNfts = async () => {
    
    try {
      
        const web3 = window.web3;
        const nftContract = new web3.eth.Contract(
          nftAbi,
          nftAddress
        );
       
        let totalIds = await nftContract.methods.walletOfOwner(acc).call();
        console.log("nfts",totalIds)
        let simplleArray = [];
       
        for (let i = 0; i < totalIds.length; i++) {
          if (totalIds[i] <= 35000) {
            let imageUrl = common;
            let imageName = `Common #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId },
            ];
            setNftsArray(simplleArray);
          } else if (totalIds[i] > 35001 && totalIds[i] <= 57000) {
            let imageUrl = uncommon;
            let imageName = `Uncommon #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId},
            ];
            setNftsArray(simplleArray);
          } else if (totalIds[i] > 57001 && totalIds[i] <= 76000) {
            let imageUrl = rare;
            let imageName = `Rare #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId},
            ];
            setNftsArray(simplleArray);
          } else if (totalIds[i] > 76001 && totalIds[i] <= 90000) {
            let imageUrl = epic;
            let imageName = `Epic #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId},
            ];
            setNftsArray(simplleArray);
          } else if (totalIds[i] > 90001 && totalIds[i] <= 98500) {
            let imageUrl = legendary;
            let imageName = `Legendary #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId},
            ];
            setNftsArray(simplleArray);
          } else if (totalIds[i] > 98501 && totalIds[i] <= 100000) {
            let imageUrl = mythic;
            let imageName = `Mythic #${totalIds[i]}`;
            let tokenId = totalIds[i];
            simplleArray = [
              ...simplleArray,
              { imageUrl, imageName, tokenId},
            ];
            console.log("simplleArray", simplleArray);
            setNftsArray(simplleArray);
          }
        }
      
    } catch (e) {
      console.error("error while get nfts", e);
    }
  };

  const getData = () => {
    if (
      acc != "No Wallet" &&
      acc != "Wrong Network" &&
      acc != "Connect Wallet"
    ) {
      console.log("welcome")
      getNfts();
    }
  };

  useEffect(()=>{
    getData()
  },[acc])

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    let sliced;
    for (var i = 0; i < nftArray.length; i++) {
      sliced = nftArray.slice(itemOffset, endOffset);
    }

    setCurrentItems(sliced);
    setPageCount(Math.ceil(nftArray.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,nftArray]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % nftArray.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <>
      <Items nftFetch={getData} currentItems={currentItems} />
      <ReactPaginate
        nextLabel={<IoCaretForwardSharp />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel={<IoCaretBackSharp />}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item page-item2"
        previousLinkClassName="page-link arrow"
        nextClassName="page-item page-item2"
        nextLinkClassName="page-link arrow"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
