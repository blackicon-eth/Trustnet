// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Trustnet.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();
        address sepoliaBaseUSDC = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
        new Trustnet(sepoliaBaseUSDC);
        vm.stopBroadcast();
    }
}   
