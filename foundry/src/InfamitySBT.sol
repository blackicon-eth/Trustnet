// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "openzeppelin/contracts/token/ERC721/ERC721.sol";

contract InfamitySBT is ERC721 {

    constructor() ERC721("InfamitySBT", "Infamia") {

    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        if (from == address(0)) {
            super.transferFrom(from, to, tokenId);
        } else {
            revert("Infamity is not transferable");
        }
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        if (from == address(0)) {   
            super.safeTransferFrom(from, to, tokenId);
        } else {
            revert("Infamity is not transferable");
        }
    }

    function balanceOf(address owner) public view override returns (uint256) {
        return super.balanceOf(owner);
    }
    
}