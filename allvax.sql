-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 04:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `allvax`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `booth_approval` (IN `appid` INT)   INSERT INTO `booth_login`(`boothName`, `boothAddress`, `boothContactNumber`, `password`) SELECT `boothName`, `boothAddress`, `boothContactNumber`, `password` FROM `booth_login_request` WHERE id =appid$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `booth_login`
--

CREATE TABLE `booth_login` (
  `id` int(11) NOT NULL,
  `boothName` varchar(100) NOT NULL,
  `boothAddress` varchar(1000) NOT NULL,
  `boothContactNumber` bigint(12) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booth_login`
--

INSERT INTO `booth_login` (`id`, `boothName`, `boothAddress`, `boothContactNumber`, `password`) VALUES
(8, 'rd', 'e1002, ahmedabad', 9638527410, '333'),
(9, 'sarg', 'bopal, ahmedabad', 1234567890, '888'),
(10, 'ghsr center', 'ghodasar, ahmedabad', 4567891230, '6363');

-- --------------------------------------------------------

--
-- Table structure for table `booth_login_request`
--

CREATE TABLE `booth_login_request` (
  `id` int(11) NOT NULL,
  `boothName` varchar(100) NOT NULL,
  `boothAddress` varchar(1000) NOT NULL,
  `boothContactNumber` bigint(12) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booth_login_request`
--

INSERT INTO `booth_login_request` (`id`, `boothName`, `boothAddress`, `boothContactNumber`, `password`) VALUES
(1, 'rd', 'e1002, ahmedabad', 9638527410, '333'),
(2, 'sarg', 'bopal, ahmedabad', 1234567890, '888'),
(3, 'ghsr center', 'ghodasar, ahmedabad', 4567891230, '6363');

-- --------------------------------------------------------

--
-- Table structure for table `booth_stats`
--

CREATE TABLE `booth_stats` (
  `id` int(11) NOT NULL,
  `boothName` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `total_vax` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booth_stats`
--

INSERT INTO `booth_stats` (`id`, `boothName`, `date`, `total_vax`) VALUES
(1, 'ghsr center-ghodasar, ahmedabad', '2025-03-22', 60),
(3, 'ghsr center-ghodasar, ahmedabad', '2025-03-19', 65),
(5, 'ghsr center-ghodasar, ahmedabad', '2025-04-23', 56),
(6, 'ghsr center-ghodasar, ahmedabad', '2025-04-20', 61);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `name`, `email`, `subject`, `message`) VALUES
(1, 'vsf', 'svevd@ajbc.cs', 'i am besty of rd', 'dfbssggwwfsgwgrtrthedfbgdgefbfdrgef'),
(2, 'manbhedu', 'rdtheboss2005@gmail.com', 'i am besty of rd', 'nvkbd;jkcnkkzxxnzkjcn.k,adkc');

-- --------------------------------------------------------

--
-- Table structure for table `family_member`
--

CREATE TABLE `family_member` (
  `id` int(11) NOT NULL,
  `fmy_name` varchar(100) NOT NULL,
  `fmy_adhar` bigint(20) NOT NULL,
  `dob` date NOT NULL,
  `user_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family_member`
--

INSERT INTO `family_member` (`id`, `fmy_name`, `fmy_adhar`, `dob`, `user_email`) VALUES
(1, 'rathin dave', 963852741963, '2025-03-08', 'rd07@gmail.com'),
(3, 'man bheda ', 963852741074, '2025-03-01', 'man1010@gmail.com'),
(5, 'falu', 963852741789, '1973-10-31', 'rd07@gmail.com'),
(6, 'kavya', 741123852456, '2001-04-27', 'rd07@gmail.com'),
(7, 'nishchal dave', 741852963456, '1972-09-18', 'rd07@gmail.com'),
(8, 'mandy shradhu', 456789123852, '2005-04-21', 'mandyshradhu@gmail.com'),
(9, 'param dixi', 124578963458, '2005-10-03', 'mandyshradhu@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `adharnumber` bigint(20) NOT NULL,
  `contact` bigint(20) NOT NULL,
  `dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`id`, `fullname`, `password`, `email`, `adharnumber`, `contact`, `dob`) VALUES
(2, 'rathin dave', '333', 'rd07@gmail.com', 963852741963, 9638527410, '2005-03-02'),
(3, 'mankumar bheda ', '555', 'man1010@gmail.com', 963852741074, 9638524560, '2004-10-10');

-- --------------------------------------------------------

--
-- Table structure for table `upcoming_vaccinations`
--

CREATE TABLE `upcoming_vaccinations` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `family_member` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `healthcareCenter` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `vaccinename` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccines`
--

INSERT INTO `vaccines` (`id`, `vaccinename`) VALUES
(1, 'Covaxine Dose1'),
(2, 'Covaxine Dose2'),
(3, 'Polio Dose1'),
(4, 'Polio Dose2'),
(5, 'Polio Dose3'),
(6, 'Polio Dose0'),
(7, 'Polio IPV Dose1'),
(8, 'Poilio IPV Dose2');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_duration`
--

CREATE TABLE `vaccine_duration` (
  `id` int(11) NOT NULL,
  `vaccinename1` varchar(200) NOT NULL,
  `period` int(11) NOT NULL,
  `vaccinename2` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaccine_duration`
--

INSERT INTO `vaccine_duration` (`id`, `vaccinename1`, `period`, `vaccinename2`) VALUES
(1, 'Covaxine Dose1', 8, 'Covaxine Dose2'),
(2, 'Polio Dose0', 6, 'Polio Dose1'),
(3, 'Polio Dose1', 4, 'Polio Dose2'),
(4, 'Polio Dose2', 4, 'Polio Dose3'),
(5, 'Polio IPV Dose1', 8, 'Poilio IPV Dose2');

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_records`
--

CREATE TABLE `vaccine_records` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `family_member` varchar(255) DEFAULT NULL,
  `proof_document` varchar(255) DEFAULT NULL,
  `healthcarecenter` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vaccine_suggest`
--

CREATE TABLE `vaccine_suggest` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `due_date` date NOT NULL,
  `family_member` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booth_login`
--
ALTER TABLE `booth_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booth_login_request`
--
ALTER TABLE `booth_login_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booth_stats`
--
ALTER TABLE `booth_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `family_member`
--
ALTER TABLE `family_member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fmy_adhar` (`fmy_adhar`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `upcoming_vaccinations`
--
ALTER TABLE `upcoming_vaccinations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccine_duration`
--
ALTER TABLE `vaccine_duration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccine_records`
--
ALTER TABLE `vaccine_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccine_suggest`
--
ALTER TABLE `vaccine_suggest`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booth_login`
--
ALTER TABLE `booth_login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `booth_login_request`
--
ALTER TABLE `booth_login_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `booth_stats`
--
ALTER TABLE `booth_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `family_member`
--
ALTER TABLE `family_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `upcoming_vaccinations`
--
ALTER TABLE `upcoming_vaccinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vaccine_duration`
--
ALTER TABLE `vaccine_duration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vaccine_records`
--
ALTER TABLE `vaccine_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vaccine_suggest`
--
ALTER TABLE `vaccine_suggest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
