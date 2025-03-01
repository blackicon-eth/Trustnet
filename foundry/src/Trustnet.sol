// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./InfamitySBT.sol";

contract Trustnet is InfamitySBT {
    
    event DealCreated(address indexed borrower, uint256 dealID, Deal indexed deal);
    event DealAccepted(address indexed lender, uint256 dealID, Deal indexed deal);
    event InfamousMinted(address indexed infamous);
    event CollateralLiquidated(address indexed infamous, uint256 dealID, Deal indexed deal);

    error IntentDeadlineIsPast();
    error RepaymentDeadlineIsPast();
    error SelfBorrowingNotAllowed();
    error NotBorrower();
    error DealNotAccepted();
    error InfamousAlreadyMinted();
    error RepaymentDeadlineExpired();
    error NotDefaulted();
    error NotRegistered();

    uint public dealCounter;
    IERC20 public usdc;

    struct User {
        uint fid;
        uint creditScore;
        int debt;
    }

    struct Deal {
        string  title;
        address lender;
        address receiver;
        address borrower;
        uint256 amount;
        uint256 offeredCollateral;
        uint256 repaymentDeadline;
        uint256 intentDeadline; 
        uint256 netInterest;
        DealStatus status;
    }

    mapping(address => User) public users;
    mapping(uint => Deal) public deals;
    mapping(uint fid => mapping(address userAddress => bool isRegistered)) public registeredUsers;

    enum DealStatus {
        PENDING,
        ACCEPTED, 
        REPAID,
        DEFAULTED
    }

    constructor(address _usdc)  {
        usdc = IERC20(_usdc);
    }

    
    function registerUser(uint _fid, bytes calldata _signature) public {
        // TODO: verify signature
        // Then register user
        registeredUsers[_fid][msg.sender] = true;
    }

    modifier onlyRegistered(uint _fid) {
        if (!registeredUsers[_fid][msg.sender]) {
            revert NotRegistered();
        }
        _;
    }

    function createDeal(
        string memory _title,
        address _receiver, 
        uint256 _amount, 
        uint256 _offeredCollateral,
        uint256 _repaymentDeadline, 
        uint256 _intentDeadline,
        uint256 _netInterest,
        uint _fid
    ) public /**onlyRegistered(_fid)*/ {
        ++dealCounter;
        
        if (_repaymentDeadline < block.timestamp) {
            revert RepaymentDeadlineExpired();
        }
        if (_intentDeadline < block.timestamp) {
            revert IntentDeadlineIsPast();
        }

        deals[dealCounter] = Deal({
            title: _title,
            lender: address(0),
            receiver: _receiver,
            borrower: msg.sender,
            amount: _amount,
            offeredCollateral: _offeredCollateral,
            repaymentDeadline: _repaymentDeadline,
            intentDeadline: _intentDeadline,
            netInterest: _netInterest,
            status: DealStatus.PENDING
        });

        usdc.transferFrom(msg.sender, address(this), _offeredCollateral);
        emit DealCreated(msg.sender, dealCounter, deals[dealCounter]);
    }


    function acceptDeal(uint256 _dealID) public {
        Deal memory deal = deals[_dealID];

        if (deal.receiver == msg.sender || deal.borrower == msg.sender) {
            revert SelfBorrowingNotAllowed();
        }
        if (deal.intentDeadline < block.timestamp) {
            revert IntentDeadlineIsPast();
        }
        if (deal.repaymentDeadline < block.timestamp) {
            revert RepaymentDeadlineIsPast();
        }
        User memory borrower = users[deal.borrower];
      
        
        borrower.debt ; // TODO: add debt
        borrower.creditScore; // TODO: add credit score
    

        deals[_dealID].lender = msg.sender;
        deals[_dealID].status = DealStatus.ACCEPTED;     

        usdc.transferFrom(msg.sender, deal.receiver, deal.amount);
        
        emit DealAccepted(msg.sender, _dealID, deals[_dealID]);
    }


    function repay(uint256 _dealID) public {
        Deal memory deal = deals[_dealID];
        if (deal.borrower != msg.sender) {
            revert NotBorrower();
        }
        if (deal.status != DealStatus.ACCEPTED) {
            revert DealNotAccepted();
        }
        if (block.timestamp > deal.repaymentDeadline) {
            revert RepaymentDeadlineIsPast();
        }
        
        deals[_dealID].status = DealStatus.REPAID;
        usdc.transferFrom(msg.sender, deal.lender, deal.amount + deal.netInterest);
    }

    function getDealStatus(uint256 _dealID) public view returns (DealStatus) {
        if (deals[_dealID].repaymentDeadline < block.timestamp && (deals[_dealID].status == DealStatus.ACCEPTED && deals[_dealID].status != DealStatus.REPAID)) {
            return DealStatus.DEFAULTED ;
        } 
        return deals[_dealID].status;
    }


    function liquidateCollateral(uint256 _dealID) public {
        Deal memory deal = deals[_dealID];
        if (deal.status != DealStatus.DEFAULTED) {
            revert NotDefaulted();
        }
        
        deal.status = DealStatus.DEFAULTED;
        if (InfamitySBT.balanceOf(deal.borrower) == 0){
            markAsInfamous(deal.borrower, _dealID);
        }

        usdc.transferFrom(deal.lender, deal.borrower, deal.offeredCollateral);

        emit CollateralLiquidated(deal.borrower, _dealID, deal);
    }

    function markAsInfamous(address _address, uint256 _dealID) internal {
        _mint(_address, uint256(uint160(_address)));
        
        emit InfamousMinted(_address);
    }
    
    function getDealsInARange(uint256 _start, uint256 _end) public view returns (Deal[] memory) {
        Deal[] memory dealsInRange = new Deal[](_end - _start); 
        for (uint256 i = _start; i < _end; i++) {
            dealsInRange[i] = deals[i];
        }
        return dealsInRange;
    }
}
