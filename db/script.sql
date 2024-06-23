-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: jobapp
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `application` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `letter` text COLLATE utf8mb4_unicode_ci,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDING','REJECTED','APPROVED','PROCESSING','DELETED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgj6l06j10b3sv83rvsnmei78a` (`candidate_id`),
  KEY `FKls6sryk64ga8o5t4bym8qu3vm` (`job_id`),
  CONSTRAINT `FKgj6l06j10b3sv83rvsnmei78a` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`),
  CONSTRAINT `FKls6sryk64ga8o5t4bym8qu3vm` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `application`
--

LOCK TABLES `application` WRITE;
/*!40000 ALTER TABLE `application` DISABLE KEYS */;
INSERT INTO `application` VALUES ('1d8e4c38-c1eb-4e8c-8da0-9853ebd16273','2024-05-13 18:36:09.314389','2024-05-13 18:36:09.314389','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/fb55afe3-d510-4864-8e80-ea550e4478f0?alt=media','candidate1@gmail.com','Phạm Ngọc Bảo Hân','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0123654789','PENDING','2cf42a59-3a31-4cf3-9374-a438b4a6fc59','e0b7d0f9-db0b-43a8-bb22-ba6472e56109'),('5b036613-866a-45a4-bdab-ad386b20d371','2024-05-12 21:24:02.448298','2024-06-19 13:42:34.861223','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/fb55afe3-d510-4864-8e80-ea550e4478f0?alt=media','candidate1@gmail.com','Phạm Ngọc Bảo Hân','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0123654789','PROCESSING','2cf42a59-3a31-4cf3-9374-a438b4a6fc59','e5d5d5f0-8266-4386-96ec-36ae64505480'),('83ad43fd-98dc-4552-9056-4af67604aad0','2024-06-05 10:18:04.941747','2024-06-05 10:18:04.941747','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/d0410c59-bf44-4ad8-805e-82f03aa3fc53?alt=media','candidate1@gmail.com','Phạm Ngọc Bảo Hân','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là Hân, và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0123654789','PENDING','2cf42a59-3a31-4cf3-9374-a438b4a6fc59','cccd9c88-7263-431d-b795-2c1f46d72715'),('b70f3c10-ef39-420c-9bbe-8c0ebe3eaf27','2024-06-05 10:27:28.049910','2024-06-05 10:29:43.879730','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/9643403f-179a-4ead-bac6-de0370c78feb?alt=media','phamtanhoang3202@gmail.com','Phạm Tấn An','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0362400302','REJECTED','8adf1cbb-5579-483b-8dad-7f5507a7ac33','18218d3a-f055-430b-b118-1b2fb22d3875'),('b8fe312a-dd57-4a05-8650-91541dbb1f41','2024-06-05 07:59:09.397685','2024-06-05 07:59:09.397685','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/bebc68c5-3c66-411d-957f-ef035f65713e?alt=media','phamtanhoang3202@gmail.com','Trương Vô Kị','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0369852147','PENDING','26e2799a-d41e-4a00-9782-7fe825f54128','91e7ca47-4704-40ee-8a94-2cadb862227c'),('bb4e533d-b945-490a-b8ba-20f5b049b7ef','2024-06-05 10:19:20.961617','2024-06-05 10:21:22.931148','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/985034f5-9fd0-4436-98f7-178eee688d97?alt=media','phamtanhoang3202@gmail.com','Phạm Tấn Hoàng','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là Hoàng và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0362400302','APPROVED','8adf1cbb-5579-483b-8dad-7f5507a7ac33','e5d5d5f0-8266-4386-96ec-36ae64505480'),('c05d2675-dade-435a-82c9-2ff07665e522','2024-05-12 18:20:41.456200','2024-06-11 16:08:45.935891','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/fb55afe3-d510-4864-8e80-ea550e4478f0?alt=media','candidate1@gmail.com','Phạm Ngọc Bảo Hân','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0123654789','APPROVED','2cf42a59-3a31-4cf3-9374-a438b4a6fc59','b8cf6e46-8900-43d3-9476-f884e7388206'),('c60b834a-053c-4ad6-941b-00dc3050a02b','2024-05-12 19:18:41.578189','2024-05-13 20:13:27.665496','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/d6a375b6-9528-4f33-9975-81260b0feef0?alt=media','candidate3@gmail.com','Phạm Tấn Hoàng','<p>Kính gửi Ông/bà,</p><p>&nbsp;</p><p>Tôi tên là Phạm Tấn Hoàng, và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, Ông/bà</p>','0362400302','APPROVED','8adf1cbb-5579-483b-8dad-7f5507a7ac33','9daec45e-c80f-43d2-8055-d5cd4cdab0e5'),('c6ab7d6e-896f-469d-9133-6a35d98bcdb1','2024-06-05 07:58:33.163918','2024-06-13 15:04:44.537437','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/bebc68c5-3c66-411d-957f-ef035f65713e?alt=media','phamtanhoang3202@gmail.com','Trương Vô Kị','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0369852147','APPROVED','26e2799a-d41e-4a00-9782-7fe825f54128','9daec45e-c80f-43d2-8055-d5cd4cdab0e5'),('e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','2024-06-09 23:17:19.141581','2024-06-19 22:35:06.282230','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/1cc46a75-2488-4989-b39f-d72de3895676?alt=media','phamtanhoang3202@gmail.com','Phạm Tấn Hoàng','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0362400302','PROCESSING','8adf1cbb-5579-483b-8dad-7f5507a7ac33','0d3c25c3-3556-4356-9c87-8e49b538440f'),('f42d8c72-e143-4a4e-b448-2d871aaf0ddd','2024-06-05 07:56:28.028117','2024-06-05 07:56:28.028117','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/985034f5-9fd0-4436-98f7-178eee688d97?alt=media','candidate3@gmail.com','Phạm Tấn Hoàng','<p>[Kính gửi] [Tên người nhận],</p><p>&nbsp;</p><p>Tôi tên là [Tên của bạn], và tôi rất hứng thú với vị trí [Tên vị trí] tại [Tên công ty]. Với [số năm] năm kinh nghiệm trong lĩnh vực [ngành nghề], tôi tin rằng tôi có thể đóng góp tích cực vào đội ngũ của quý công ty.</p><p>&nbsp;</p><p>Trong công việc trước đây, tôi đã [tóm tắt một hoặc hai thành tựu nổi bật]. Điều này giúp tôi phát triển kỹ năng [liệt kê kỹ năng liên quan đến công việc bạn ứng tuyển]. Tôi rất mong được trao đổi thêm về cách tôi có thể giúp công ty đạt được mục tiêu của mình.</p><p>&nbsp;</p><p>Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi. Tôi mong sớm nhận được phản hồi từ bạn.</p><p>&nbsp;</p><p>Trân trọng, [Tên của bạn]</p>','0362400302','PENDING','8adf1cbb-5579-483b-8dad-7f5507a7ac33','cccd9c88-7263-431d-b795-2c1f46d72715');
/*!40000 ALTER TABLE `application` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` datetime(6) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `introduction` text COLLATE utf8mb4_unicode_ci,
  `is_find_job` bit(1) DEFAULT NULL,
  `job` text COLLATE utf8mb4_unicode_ci,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` enum('MALE','FEMALE','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_67uyxu00tx9l55fptjvodc0gl` (`user_id`),
  CONSTRAINT `FKj9h7beyp5gsdtdb20km82b4fl` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES ('26e2799a-d41e-4a00-9782-7fe825f54128','2024-05-12 10:46:32.836731','2024-05-12 11:29:24.093915','Thành phố Hồ Chí','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/c8ae8a78-a9c3-4c5f-b5ee-e9875770f46e?alt=media','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/bebc68c5-3c66-411d-957f-ef035f65713e?alt=media','2002-08-14 00:00:00.000000','Trương Vô','Hiện tại tôi có thể đi thực tập full time. Tôi mong muốn tìm được một môi trường làm việc\n đầy nhiệt huyết và máu lửa, mong muốn được phát triển và gắn bó lâu dài với công ty sau\n thời gian thực tập. Bởi tôi hiểu rằng, khi bạn nỗ lực hết mình vì Công ty, bạn sẽ nhận được\n thành công xứng đáng',_binary '','Designer','Kị','http://localhost:3000/profile','0369852147','MALE','f0058242-8b77-4411-bb77-0208ddfed26f'),('2cf42a59-3a31-4cf3-9374-a438b4a6fc59','2024-05-12 10:45:44.596548','2024-06-05 10:17:32.341769','Thành phố Hồ Chí Minh','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/9adcb6cc-36ce-4973-8e0a-a621a757f156?alt=media','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/d0410c59-bf44-4ad8-805e-82f03aa3fc53?alt=media','2001-07-17 00:00:00.000000','Phạm Ngọc Bảo','Tôi là một người tự tin và tự chủ, luôn cống hiến hết mình cho mọi dự án mà tôi tham gia. Với hơn [số năm] kinh nghiệm làm việc trong lĩnh vực kế toán, tôi đã tích lũy được kiến thức sâu rộng và kỹ năng cần thiết để thực hiện mọi nhiệm vụ một cách hiệu quả.',_binary '','Kế toán','Hân',NULL,'0123654789','FEMALE','4013e0cb-245e-49ae-b432-2a7500736640'),('6e59aea8-a862-4403-ae0c-ca330df231e8','2024-05-12 10:47:54.939678','2024-06-04 10:38:09.950952',NULL,'https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/d4ef18dd-7647-4db4-a534-33279930db1e?alt=media','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/fb55afe3-d510-4864-8e80-ea550e4478f0?alt=media','1997-11-25 00:00:00.000000','Nguyễn Thị Trúc',NULL,_binary '',NULL,'Linh',NULL,NULL,'FEMALE','143bf3b7-f1d1-4c8e-88c2-13e781accd47'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','2024-05-12 10:47:08.462709','2024-06-15 18:33:30.718987','Thành phố Buôn Mê Thuật','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/4e15bda9-8a48-4f56-98dc-8f2544de1dd8?alt=media','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/6b0def33-75d8-4976-a0fe-11b91c1a0cd8?alt=media','2002-02-03 00:00:00.000000','Phạm Tấn','My name is Hoang, and I am currently a fourth-year student at Open University. I am an enthusiastic learner, always striving to improve my skills and knowledge. I am very determined and I never give up when I face challenges.',_binary '','Full-Stack Developer','Hoàng','https://github.com/phamtanhoang','0362400302','MALE','3b61bcc7-b448-494f-851f-371487487149'),('bc03a971-9fd2-4e70-a92b-95d2449f0a11','2024-06-19 23:16:06.193618','2024-06-19 23:27:26.789165','Hà Nội','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/bdb1d0fc-d977-4ad5-a837-1464e5083016?alt=media',NULL,'1997-06-12 00:00:00.000000','Trần','Tôi là một người tự tin và tự chủ, luôn cống hiến hết mình cho mọi dự án mà tôi tham gia. Với hơn 3 kinh nghiệm làm việc trong lĩnh vực, tôi đã tích lũy được kiến thức sâu rộng và kỹ năng cần thiết để thực hiện mọi nhiệm vụ một cách hiệu quả.',_binary '','Lập trình viên','Minh','https://mail.google.com','0968574321','MALE','74782b00-9f76-41fc-b94b-fbf7fb802aee'),('c9fa5d74-81f6-449d-a3ba-ad5d78c179b3','2024-06-20 00:31:42.092838','2024-06-20 00:33:54.713113','Thành phố Hồ Chí Minh',NULL,NULL,'2002-09-02 00:00:00.000000','Khánh','Hiện tại tôi đang làm việc trong lĩnh vực kiểm thử phần mềm (Tester). Với niềm đam mê về công nghệ và sự tỉ mỉ, cẩn thận trong công việc, tôi đã và đang cống hiến hết mình để đảm bảo chất lượng sản phẩm phần mềm đạt tiêu chuẩn cao nhất.',_binary '','Tester','Huyền','https://www.topcv.vn/','0976427683','FEMALE','350737c2-fa83-4aed-8eba-2425ba5cbd88'),('ed45f0a9-fea3-4df9-91bf-d0409b1bb964','2024-06-20 00:18:13.849246','2024-06-20 00:22:33.504436','Thành phố Huế',NULL,NULL,'1999-08-09 00:00:00.000000','Trương','Hiện tại, tôi đang làm việc trong ngành Sales và đã gặt hái được nhiều thành công đáng kể trong sự nghiệp của mình.',_binary '','Nhân viên Sale','Đạt','https://www.facebook.com/','0978652435','MALE','15015b3a-3192-4b87-80f8-febc415d6476');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `image` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('0f59f7cb-ce95-481f-b05e-a479fc180ba7','2024-05-12 17:08:58.890814','2024-05-12 17:08:58.890814','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/655c2bf8-48fe-4f34-a5c8-e6cadbbbfeb5?alt=media','Luật / Pháp lý'),('14baada3-7172-440a-a504-f345eae8e496','2024-05-12 16:56:19.683510','2024-05-12 16:56:30.342427','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/7bfe9266-e766-4edc-bfb4-ebb699caf4e8?alt=media','Y tế / Sức khỏe / Làm đẹp'),('1599002e-f534-41cd-84f9-8417baf828db','2024-05-12 16:54:27.577625','2024-05-12 16:54:27.577625','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/63919cd3-ad5b-46a2-8022-ccac4f465d4b?alt=media','Giáo dục / Đào tạo'),('1d202599-0708-43d2-981d-7627bc45f799','2024-05-12 16:59:56.611595','2024-05-12 16:59:56.611595','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/1275f2c4-fd13-485f-b276-307ed8a5a34c?alt=media','Nhà hàng / Khách sạn'),('3e441a5b-6fc2-4976-b8d2-8c8ce5b06637','2024-05-12 17:01:15.403119','2024-05-12 17:01:15.403119','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/1677ef00-9640-45e1-bb05-ba0a781b3b95?alt=media','Thiết kế thời trang /  Thiết kế đồ'),('63b5eb65-60b4-4a48-b772-58c874ec17b7','2024-05-12 16:49:41.031683','2024-05-12 16:49:47.651051','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/f5d5baac-070b-4b54-ac68-8aa569bb24ee?alt=media','Truyền thông / Quảng cáo'),('8d5eb24e-7f2b-43fe-9bab-fe4a705d4ef2','2024-05-12 16:51:49.236542','2024-05-12 16:51:49.236542','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/7f4b1444-b7a4-4afb-abf1-173ea549229a?alt=media','Cơ khí / Điện / Điện tử'),('974f8a66-e4fc-4535-ab68-b906df14efa2','2024-05-12 16:58:49.955964','2024-05-12 16:58:49.955964','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/40da0df5-f03d-491c-85a4-664a7e4c8d54?alt=media','Kiến trúc / Xây dựng'),('a3f90765-54bf-4052-92fe-8b254c616f12','2024-05-12 16:47:17.288432','2024-05-12 16:47:17.288432','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/3cc261f8-8184-4524-9b32-7168650e2a90?alt=media','Kinh doanh / Bán hàng / Chăm sóc khách'),('b010c8a2-e562-4d78-baf5-ac98776cc297','2024-05-12 16:57:36.780978','2024-05-12 16:57:36.780978','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/b0fa0bef-518a-42e8-844b-7185bfea7567?alt=media','Logistics / Xuất nhập khẩu / Kho'),('ee770f1b-5be1-4b3f-a227-fe28e186ca8f','2024-05-12 16:48:49.115066','2024-05-12 16:48:49.115066','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/1135183e-25a7-4c48-85b2-aaa80e2c388f?alt=media','Tài chính / Kế toán'),('f942ea36-9841-4a75-a497-ce6bc259f208','2024-05-12 16:53:21.876987','2024-05-12 16:53:36.368292','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/4a3ffd9e-d375-4bd3-9365-24208d473859?alt=media','Công nghệ thông tin / Điện tử viễn thông');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `education` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence` int NOT NULL,
  `to_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKafkm5slwf4fk1tx4uf4cwlxor` (`candidate_id`),
  CONSTRAINT `FKafkm5slwf4fk1tx4uf4cwlxor` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES ('15a37466-816a-4ab0-b398-fc8293ef9246','2024-06-19 23:32:33.976455','2024-06-19 23:32:33.976455','Lập trình Web','Cao đẳng FPT','2014-01-01',1,'2016-01-01','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('1709efd5-e1cc-456c-80ba-83a46440ebf4','2024-06-20 00:26:07.492105','2024-06-20 00:26:07.492105','Quản trị kinh doanh','Đại học Hutech','2018-01-20',1,'2022-02-20','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('2737b95a-2720-4e5c-811c-d46c5662ce4c','2024-05-12 11:09:48.542061','2024-05-12 11:09:48.542061','Chuyên ngành luật kinh tế','Đại học Mở Thành phố Hồ Chí Minh','2018-11-12',1,'2022-11-12','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('390aff19-8384-40ae-89b4-a34b26d74b91','2024-06-20 00:36:39.772775','2024-06-20 00:36:39.772775','Chuyên ngành kiểm thử phấn mềm','Đai học Công nghệ thông tin','2020-09-05',1,'2024-05-31','c9fa5d74-81f6-449d-a3ba-ad5d78c179b3'),('4cb0aa4f-08d3-4fbe-b4a4-542d71ec6a62','2024-05-12 11:30:53.178528','2024-05-12 11:30:53.178528','Chuyên ngành Designer','Đai học Sài Gòn','2020-09-12',1,'now','26e2799a-d41e-4a00-9782-7fe825f54128'),('d4ab403b-94c9-4997-9d0d-915bad0ca8f9','2024-06-17 19:59:59.434485','2024-06-17 19:59:59.434485','Chuyên ngành Công Nghệ Thông Tin.','Đại học Mở Thành phố Hồ Chí Minh','2020-09-12',1,'now','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('daf83386-1dc8-47df-ad95-e1e30535e245','2024-06-20 00:26:07.492105','2024-06-20 00:26:07.492105','Luật kinh tế','Đại mở','2023-03-20',2,'now','ed45f0a9-fea3-4df9-91bf-d0409b1bb964');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `background_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_o174melgraphcfswfws05j20q` (`business_code`),
  UNIQUE KEY `UK_k30e1f6l8hxi1t8aabflue0he` (`user_id`),
  CONSTRAINT `FK81pr23jf16cs0wxoh94yj2nug` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
INSERT INTO `employer` VALUES ('00729907-9d4b-44bd-9cb7-2c30a6fca0e2','2024-05-12 12:00:00.235545','2024-05-12 12:00:00.235545',NULL,'96332115566','Tập đoàn Vingroup là một tập đoàn đa ngành của Việt Nam. Vingroup được thành lập vào ngày 8 tháng 8 năm 1993, với tiền thân là công ty Technocom chuyên về sản xuất mỳ ăn liền tại Ukraina bởi một nhóm các du học sinh người Việt Nam, những người này sau đó quay trở lại đầu tư đa ngành tại quê hương.','https://res.cloudinary.com/dzitm0sot/image/upload/v1697383270/yo5ci29ndzhu7guswimu.jpg','178 Lê Thanh Nghị, Hoà Cường Bắc, Hải Châu, Đà Nẵng, Việt Nam','Tập đoàn VinGroup','0123654789','ca7aa652-b0f9-4218-8be2-6909bff0a5d2'),('03b67a0f-6c28-451e-886f-04513794a292','2024-05-12 16:30:37.531520','2024-05-12 16:30:37.531520',NULL,'9874126321','Slack Technologies, LLC là một công ty phần mềm của Mỹ được thành lập vào năm 2009 tại Vancouver, British Columbia, được biết đến với nền tảng giao tiếp độc quyền Slack.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/DoAnNganh/Slack_lqee4s.png','475A Đ. Điện Biên Phủ, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Công ty phần mềm Slack','0123654821','536da641-c6c0-4d4f-b26c-eebbb6535976'),('1833f87c-b209-4091-aee0-a3bf692fbf75','2024-05-12 16:39:06.964555','2024-05-12 16:39:06.964555',NULL,'88559674123','Meta là một công ty truyền thông xã hội và công nghệ Mỹ có trụ sở tại Menlo Park, California. Meta cung cấp các sản phẩm và dịch vụ khác. Nó đã mua lại Instagram, WhatsApp và Oculus và phát triển độc lập các ứng dụng Facebook Messenger, Threads, Facebook Watch và Facebook Portal. Nó còn có 9,99% cổ phần trên Jio Platforms.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Facebook_PNG_%C3%8Dcone_Logo_Transparente_Sem_Fundo_preview_rev_1_ascfuk.png','Số 24 - NH1 , Núi Hiểu, Quang Châu, Việt Yên, Bắc Giang, Việt Nam','Công ty truyền thông xã hội và công nghệ Meta','0526314980','65699a8c-4074-445c-a4a7-c0d580c10f8a'),('646b3e6b-68d7-4952-8028-c0340a24ab8a','2024-05-12 16:28:09.483148','2024-05-12 16:28:09.483148',NULL,'7854126542','Microsoft là một tập đoàn đa quốc gia của Hoa Kỳ đặt trụ sở chính tại Redmond, Washington; chuyên phát triển, sản xuất, kinh doanh bản quyền phần mềm và hỗ trợ trên diện rộng các sản phẩm và dịch vụ liên quan đến máy tính.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Microsoft_wdzszl.png','390 Hoàng Văn Thụ, Phường 4, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam','Tập đoàn đa quốc gia Microsoft','0978541652','c74af638-4945-4899-b217-5ecdfb8ba83b'),('6b1ca7fd-3f4d-4da0-bf12-9b5f190c74fa','2024-05-12 16:34:44.207608','2024-05-12 16:34:44.207608',NULL,'7126543985','Xiaomi Inc. là một Tập đoàn sản xuất hàng điện tử Trung Quốc có trụ sở tại Thâm Quyến. Xiaomi là nhà sản xuất điện thoại thông minh lớn thứ 2 thế giới; trong quí 3 năm 2021, Xiaomi đã chiếm gần 17% thị trường điện thoại thông minh thế giới.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Xiaomi_Logo_Mi___01_-_PNG_Logo_Vector_Downloads_SVG_EPS_g755yt.png','3250 Tân Minh, Sóc Sơn, Hà Nội, Việt Nam','Tập đoàn Xiaomi','0123654789','2eb13c86-dee8-4650-8e7e-16f3780fdaac'),('6c32a422-f749-413c-a032-44c86d0ba7b8','2024-05-12 11:58:55.259861','2024-05-12 11:58:55.259861',NULL,'963251478','YouTube là một nền tảng chia sẻ video trực tuyến của Mỹ có trụ sở chính tại San Bruno, California. Nền tảng này được tạo ra vào tháng 2 năm 2005 bởi ba nhân viên cũ của PayPal — Chad Hurley, Steve Chen và Jawed Karim.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Icon_Youtube_Logo_Png_Clipart_5305994_-_PinClipart_preview_rev_1_n9ibgk.png','245/20b, Nguyễn Công Hoan, Hoà An, Liên Chiểu, Đà Nẵng, Việt Nam','Doanh nghiệp Youtube','0635298547','9eb50613-4bd0-4500-b373-27800c10189a'),('996c3cb5-47b2-48d6-ba42-297608a1b2f0','2024-05-12 16:42:43.145063','2024-05-12 16:42:43.145063',NULL,'0965842631','Twitter, là một phương tiện truyền thông mạng xã hội và dịch vụ mạng xã hội trực tuyến được điều hành bởi X Corp., công ty kế thừa của Twitter, Inc. X cho phép người sử dụng đọc, nhắn và cập nhật các mẩu tin nhỏ gọi là tweets, một dạng tiểu blog.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Twitter_Logo_White_Background_PNG_Image_With_Transparent_Background_png_-_Free_PNG_Images_preview_rev_1_ecww3c.png','Đường Kim Chung, Kim Chung, Đông Anh, Hà Nội, Việt Nam','Doanh nghiệp Twitter','0965842631','46456c1b-7d34-4f55-98c7-09616da21b37'),('9e6fed88-82a4-43d6-965b-8fbe74234343','2024-05-12 16:33:12.891932','2024-05-12 16:33:12.891932',NULL,'8956214732','Instagram là một dịch vụ mạng xã hội chia sẻ hình ảnh và video của Mỹ được tạo ra bởi Kevin Systrom và Mike Krieger.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/Instagram_application_icon_Logo_Computer_Icons_Social_media_insta_transparent_background_PNG_clipart_preview_rev_1_wohb6c.png','27 Đ. Cổ Linh, Long Biên, Hà Nội, Việt Nam','Doanh nghiệp Instagram','099995588','9a750c5d-2b69-406d-93e4-1f83ade25c4d'),('a809e019-b0c1-4fcf-87a8-9f241dc93973','2024-05-12 16:32:07.307244','2024-05-12 16:32:07.307244',NULL,'07841263256','Cloudinary là một công ty công nghệ SaaS có trụ sở chính tại Santa Clara, California, với các văn phòng tại Israel, Anh, Ba Lan và Singapore. Công ty cung cấp dịch vụ quản lý hình ảnh và video dựa trên đám mây.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704601/DoAnNganh/Cloudinary_qv3qsn.png','720A Đ. Điện Biên Phủ, Vinhomes Tân Cảng, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Công ty công nghệ Cloudinary','0374896215','52ccc54d-c5e3-4d46-9543-1632ce60afdf'),('c186a2f0-a692-4f7b-9a61-22692ac2df7a','2024-05-12 16:26:11.699073','2024-05-12 16:26:11.699073',NULL,'98745632145','TikTok là nền tảng video âm nhạc và mạng xã hội của Trung Quốc được ra mắt vào năm 2017, dành cho các thị trường bên ngoài Trung Quốc. bởi Trương Nhất Minh, người sáng lập của ByteDance','https://res.cloudinary.com/dcpatkvcu/image/upload/v1695031301/DoAnNganh/TikTok_Logo_Video_Tik_Tok_Sign_Symbol_Musically_preview_rev_1_ubknkg.png','192 Hoài Thanh, Bắc Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam','Doanh nghiệp Tiktok','09632145215','ad5c2fa0-6239-437c-bece-09535a371be8'),('d4b4525c-c2b4-499a-aa50-491fba2ab238','2024-05-12 11:57:52.163091','2024-05-12 20:18:52.973038','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/137134ef-10b5-45a6-989e-43aa3d114f72?alt=media','32156982147','Google LLC là một công ty công nghệ đa quốc gia của Mỹ, chuyên về các dịch vụ và sản phẩm liên quan đến Internet, bao gồm các công nghệ quảng cáo trực tuyến, công cụ tìm kiếm, điện toán đám mây, phần mềm và phần cứng.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694701182/DoAnNganh/Google_oecx0q.png','268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam','Công ty công nghệ đa quốc gia Google','03215624152','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('fab1cd32-0ecf-42c0-894a-f767ceb21c37','2024-05-12 16:29:30.089514','2024-05-13 17:33:45.451746','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/c2bf49cb-116b-4533-b3d7-7246eb4f1b7b?alt=media','67788333221','Airbnb, là một thị trường cộng đồng cho việc đặt và cho thuê phòng, căn hộ, có trụ sở tại Silicon Valley, California được thành lập trong năm 2008, tương tự như một hệ thống đặt hàng trực tuyến.','https://res.cloudinary.com/dcpatkvcu/image/upload/v1694704044/DoAnNganh/Airbnb_dy33tc.png','47 Nguyễn Huy Lượng, Phường 7, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam','Công ty Airbnb','0345216325','0963332b-27d9-4949-ae23-b534fdf674dd');
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer_candidate_follow`
--

DROP TABLE IF EXISTS `employer_candidate_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employer_candidate_follow` (
  `employer_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`employer_id`,`candidate_id`),
  KEY `FKero5emnct1etylkwvypwwy9mn` (`candidate_id`),
  CONSTRAINT `FKeaneoofssukbx8okqsr35sn73` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`id`),
  CONSTRAINT `FKero5emnct1etylkwvypwwy9mn` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer_candidate_follow`
--

LOCK TABLES `employer_candidate_follow` WRITE;
/*!40000 ALTER TABLE `employer_candidate_follow` DISABLE KEYS */;
INSERT INTO `employer_candidate_follow` VALUES ('d4b4525c-c2b4-499a-aa50-491fba2ab238','8adf1cbb-5579-483b-8dad-7f5507a7ac33');
/*!40000 ALTER TABLE `employer_candidate_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `experience` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence` int NOT NULL,
  `to_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsmv65lqovssalk12ti3cqkpjf` (`candidate_id`),
  CONSTRAINT `FKsmv65lqovssalk12ti3cqkpjf` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES ('05cc9afa-9c51-46ee-b158-ac935d3a7d82','2024-05-12 11:06:30.420220','2024-05-12 11:06:30.420220','Kế toán thuế','Công ty TNHH Phân Phối Synnex FPT','2024-01-01',2,'now','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('52818d4d-16e3-4482-aba3-1d3ad2473105','2024-06-19 23:29:29.822150','2024-06-19 23:29:29.822150','Lập trình viên FE','Công ty ABC','2016-02-19',1,'2020-02-04','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('9ac3d43f-0b8d-498f-a8a1-b5a8bae9d919','2024-06-19 23:29:29.822150','2024-06-19 23:29:29.822150','Lập trình viên Full stack','Công ty QWE','2020-06-19',2,'now','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('a26c9ce9-1c84-4cbc-9ef6-04e6467b458e','2024-06-20 00:24:14.560452','2024-06-20 00:24:14.560452','Nhân viên Sale','Công ty công nghệ Google','2023-09-20',2,'2024-05-31','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('a70d4a6a-b71a-490f-a3be-2bc0962a0da2','2024-06-13 14:49:53.258368','2024-06-13 14:49:53.258368','Lập trình viên Front-end','Công ty thương mại và dịch vụ Laco','2023-11-11',1,'2024-05-09','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('e173e453-c30e-4a69-9399-58ccf7aff2da','2024-06-20 00:24:14.559188','2024-06-20 00:24:14.559188','Nhân viên Sale','Công ty JQK','2020-01-20',1,'2023-06-20','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('e84c535a-5522-4d87-9bbd-9ba643e8bc0e','2024-05-12 11:06:30.418213','2024-05-12 11:06:30.418213','Kế toán tài chính','Công ty Cổ phần Solazu','2019-02-12',1,'2023-11-30','2cf42a59-3a31-4cf3-9374-a438b4a6fc59');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followed_employer`
--

DROP TABLE IF EXISTS `followed_employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_employer` (
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employer_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`candidate_id`,`employer_id`),
  KEY `FK989hm03pigjvyhjd49fqdxmy8` (`employer_id`),
  CONSTRAINT `FK989hm03pigjvyhjd49fqdxmy8` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`id`),
  CONSTRAINT `FKrgidigfnvbockqt4kpuvbb287` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_employer`
--

LOCK TABLES `followed_employer` WRITE;
/*!40000 ALTER TABLE `followed_employer` DISABLE KEYS */;
INSERT INTO `followed_employer` VALUES ('6e59aea8-a862-4403-ae0c-ca330df231e8','00729907-9d4b-44bd-9cb7-2c30a6fca0e2'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','00729907-9d4b-44bd-9cb7-2c30a6fca0e2'),('ed45f0a9-fea3-4df9-91bf-d0409b1bb964','00729907-9d4b-44bd-9cb7-2c30a6fca0e2'),('c9fa5d74-81f6-449d-a3ba-ad5d78c179b3','03b67a0f-6c28-451e-886f-04513794a292'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','1833f87c-b209-4091-aee0-a3bf692fbf75'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','6c32a422-f749-413c-a032-44c86d0ba7b8'),('ed45f0a9-fea3-4df9-91bf-d0409b1bb964','9e6fed88-82a4-43d6-965b-8fbe74234343'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','a809e019-b0c1-4fcf-87a8-9f241dc93973'),('ed45f0a9-fea3-4df9-91bf-d0409b1bb964','c186a2f0-a692-4f7b-9a61-22692ac2df7a'),('26e2799a-d41e-4a00-9782-7fe825f54128','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('2cf42a59-3a31-4cf3-9374-a438b4a6fc59','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('8adf1cbb-5579-483b-8dad-7f5507a7ac33','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('c9fa5d74-81f6-449d-a3ba-ad5d78c179b3','fab1cd32-0ecf-42c0-894a-f767ceb21c37');
/*!40000 ALTER TABLE `followed_employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hr_candidate_follow`
--

DROP TABLE IF EXISTS `hr_candidate_follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hr_candidate_follow` (
  `hr_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`hr_id`,`candidate_id`),
  KEY `FKa4qmxb706f0xejp1nfasblq2l` (`candidate_id`),
  CONSTRAINT `FKa4qmxb706f0xejp1nfasblq2l` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`),
  CONSTRAINT `FKlncte2ngtdpmdnke0mu53a88g` FOREIGN KEY (`hr_id`) REFERENCES `human_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hr_candidate_follow`
--

LOCK TABLES `hr_candidate_follow` WRITE;
/*!40000 ALTER TABLE `hr_candidate_follow` DISABLE KEYS */;
INSERT INTO `hr_candidate_follow` VALUES ('0b394c4e-876c-48d6-a87f-49a7f6f3f305','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('0b394c4e-876c-48d6-a87f-49a7f6f3f305','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('fad65e9b-9f07-4b12-8f92-6aceba45b690','8adf1cbb-5579-483b-8dad-7f5507a7ac33');
/*!40000 ALTER TABLE `hr_candidate_follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `human_resource`
--

DROP TABLE IF EXISTS `human_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `human_resource` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_birth` datetime(6) DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` enum('MALE','FEMALE','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `employer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_p7bqp8s63ytbi8vfhgk20omsg` (`user_id`),
  KEY `FK6nereq40dw4xv40gko9gklbib` (`employer_id`),
  CONSTRAINT `FK6nereq40dw4xv40gko9gklbib` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`id`),
  CONSTRAINT `FKgjvlg5k5mk6fcjcvqndhggfrw` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `human_resource`
--

LOCK TABLES `human_resource` WRITE;
/*!40000 ALTER TABLE `human_resource` DISABLE KEYS */;
INSERT INTO `human_resource` VALUES ('0b394c4e-876c-48d6-a87f-49a7f6f3f305','2024-05-12 17:46:16.347130','2024-05-17 17:23:38.095069','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/48b550cc-8682-4c77-a60d-b445a1aab913?alt=media','1999-11-23 00:00:00.000000','Đinh Minh','Hiếu','0996633252','MALE','d4b4525c-c2b4-499a-aa50-491fba2ab238','8c8c69b3-87e1-4170-bc1e-6bbe0c27d3c8'),('2ba56fa7-eee9-4749-87b2-1ed91972d57c','2024-05-12 17:55:40.150301','2024-05-12 17:55:40.150301',NULL,'2001-10-12 00:00:00.000000','Lê','Tuyết','0556633221','FEMALE','6c32a422-f749-413c-a032-44c86d0ba7b8','911ee4f6-f2ef-4edc-8d29-a62d98fcd36d'),('2c31b8eb-5c6c-4dcb-88b6-eb88c1ae8ee9','2024-05-13 17:35:07.016479','2024-05-13 17:35:07.016479',NULL,'2002-12-31 00:00:00.000000','Nguyễn Tuấn','Dũ','0357698214','OTHER','fab1cd32-0ecf-42c0-894a-f767ceb21c37','7b1b594e-c278-4e5c-861b-147d2f9c4d39'),('3e4680be-8594-4f73-b9a1-f415ee14a6bb','2024-06-05 08:33:44.147303','2024-06-05 08:33:44.147303',NULL,'1995-07-10 00:00:00.000000','Nguyễn','Sơn','0652413985','MALE','9e6fed88-82a4-43d6-965b-8fbe74234343','098349fa-e9e1-41c7-8404-b07947a3a66d'),('7aed7361-fb13-4897-993a-07ba5fcd4758','2024-05-12 17:48:02.651859','2024-05-12 17:48:02.651859',NULL,'2000-10-16 00:00:00.000000','Lê Quang','Đạt','0375126480','OTHER','d4b4525c-c2b4-499a-aa50-491fba2ab238','00183215-5464-41e2-982e-13141af08b78'),('f2000544-c13e-4e72-a7f0-022ce450f9ea','2024-05-12 17:54:45.460657','2024-05-12 17:54:45.460657',NULL,'2024-05-31 00:00:00.000000','Bùi Ngọc','Long','0778899665','MALE','6c32a422-f749-413c-a032-44c86d0ba7b8','5eaec381-56c7-4b4c-9709-d3ba3dd34292'),('fad65e9b-9f07-4b12-8f92-6aceba45b690','2024-05-12 17:49:11.893414','2024-05-12 17:49:11.893414',NULL,'2002-02-16 00:00:00.000000','Dương Thị Kiều','Vy','0396541265','FEMALE','d4b4525c-c2b4-499a-aa50-491fba2ab238','8ce3cc04-72c5-466d-bc98-6cdeb3da3714');
/*!40000 ALTER TABLE `human_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `experience` text COLLATE utf8mb4_unicode_ci,
  `from_salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('ACTIVE','PENDING','INACTIVE','DELETED','PAUSED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to_date` datetime(6) NOT NULL,
  `to_salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `human_resource_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `process_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1jtisqv4yk9oxdk2a2qgdnwq6` (`category_id`),
  KEY `FKlhimi0lijhcy7caj9hj50bt1q` (`human_resource_id`),
  KEY `FKgxag81y5gyhuu8oomv9ab8m1j` (`process_id`),
  CONSTRAINT `FK1jtisqv4yk9oxdk2a2qgdnwq6` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `FKgxag81y5gyhuu8oomv9ab8m1j` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`),
  CONSTRAINT `FKlhimi0lijhcy7caj9hj50bt1q` FOREIGN KEY (`human_resource_id`) REFERENCES `human_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES ('087cb281-b9c2-4899-b1d2-e208255ca6d6','2024-06-17 19:58:07.900174','2024-06-17 20:01:08.880026','<h3><strong>Mô tả công việc:</strong></h3><blockquote><ul><li>Sản phẩm: OnUni - Chương trình Cử nhân trực tuyến dành cho người đi làm.</li><li>Chịu trách nhiệm tư vấn thông tin tuyển sinh các chương trình cử nhân trực tuyến tới khách hàng có nhu cầu.</li><li>Liên hệ với khách hàng có nhu cầu dựa trên <strong>data có sẵn được công ty cung cấp</strong>.</li><li>Tư vấn, giải đáp cho khách hàng thông tin của chương trình đào tạo cử nhân trực tuyến và hướng dẫn các thủ tục hồ sơ/học phí/nhập học của từng trường tuyển sinh.</li><li>Quản lý thông tin khách hàng, cập nhật liên tục trạng thái khách hàng trên hệ thống cơ sở dữ liệu.</li><li>Được đào tạo nâng cao kỹ năng năng tư vấn.</li><li><strong>Thời gian làm việc: </strong>Giờ hành chính 8h00 - 17h30 Từ thứ Hai đến thứ Sáu và 02 thứ Bảy/tháng.</li><li><strong>Địa điểm làm việc:</strong><ul><li>Tầng 3, 17T4 Hapulico Complex, số 1 Nguyễn Huy Tưởng, Thanh Xuân, Đà Nẵng.</li></ul></li></ul></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><ul><li>Giới tính: Nữ, sinh năm 1998 - 1987.</li><li>Máu chiến, đam mê kiếm tiền.</li><li>Kinh nghiệm: Có từ 1 năm kinh nghiệm telesale/ tư vấn qua điện thoại.</li><li>Kỹ năng:<ul><li>Tư vấn sản phẩm, dịch vụ qua điện thoại.</li><li>Xử lý vấn đề, tình huống phát sinh.</li><li>Định hướng, dẫn dắt khách hàng.</li></ul></li><li>Ứng viên có kinh nghiệm trong lĩnh vực giáo dục là một lợi thế.</li><li>Có laptop cá nhân.</li></ul></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p><strong>Thu nhập trung bình từ 15.000.000 - 30.000.000 VNĐ/tháng.</strong></p><ul><li>Bao gồm lương cứng khởi điểm từ 7.000.000/tháng + lương làm việc thứ Bảy + lương KPI + thưởng khác. (Lương cứng không bị ảnh hưởng bởi KPI)</li><li>Thử việc: 2 tháng nhận 100% lương cứng + lương KPI.</li><li>Chế độ thưởng nóng, thưởng kì, thưởng dự án,...</li></ul><p><strong>- Cơ hội phát triển:</strong></p><ul><li>Thu nhập:<strong> </strong>Review lương và điều chỉnh level ngay sau thử việc và định kỳ mỗi 3-4 tháng.</li><li>Chuyên môn:<strong> </strong>Tham gia các khóa đào tạo định kỳ của team và công ty để nâng cao nghiệp vụ chuyên môn.</li><li>Phát triển theo 2 hướng: quản lý hoặc chuyên gia đào tạo, giám sát.</li></ul><p><strong>- Cơ chế phúc lợi khác:</strong></p><ul><li>Phụ cấp ăn trưa: 25.000 VND/ ngày.</li><li>Phụ cấp Laptop: 100.000 VND/ tháng.</li><li>Hỗ trợ 2.000.000 VND/năm cho hoạt động thể thao-làm đẹp.</li><li>Được hưởng đầy đủ các quyền lợi theo chính sách của công ty: bảo hiểm, đám cưới hỏi, thai sản, hiếu hỉ, lễ Tết...</li><li>Khám sức khỏe định kỳ hàng năm.</li><li>Teambuilding 1 lần/năm vào mùa hè và hơn 20 sự kiện nội bộ trong năm như: Onsers Friday, Onsers Family Day, YEP, Sinh nhật, Trung Thu, Ngày phụ nữ 20/10, 8/3; Ngày nam giới 6/4...</li><li>Văn phòng làm việc sáng tạo với nhiều tiện ích như Máy Pha Café, Khu chơi Bi-lắc…</li></ul></blockquote>','','','Thành phố Đà Nẵng','Chuyên Viên Tư Vấn Tuyển Sinh (Làm Giờ Hành Chính, Thử Việc Full Lương)','ACTIVE','2024-08-31 00:00:00.000000','','a3f90765-54bf-4052-92fe-8b254c616f12','f2000544-c13e-4e72-a7f0-022ce450f9ea','a8cb9881-8ce2-4d1f-9fe1-21d699c89fba'),('0d3c25c3-3556-4356-9c87-8e49b538440f','2024-06-06 22:43:44.698072','2024-06-19 00:17:35.704189','<h3><strong>Mô tả công việc:</strong></h3><blockquote><ul><li>Thiết lập bảng phân công công việc hàng tháng cho bộ phận kỹ thuật.</li><li>Bảo trì và vận hành hệ thống M&amp;E trong tòa nhà.</li><li>Bảo trì kiểm tra tất cả hệ thống phân phối điện, nước, ga, v.v. nhằm đảm bảo hệ thống luôn trong điều kiện hoạt động tốt.</li><li>Bảo trì cơ cấu xây dựng, tiện ích và thẩm mỹ của toà nhà và bảo đảm PCCC.</li><li>Giám sát và phối hợp cùng các nhà thầu bên ngoài theo đúng hợp đồng, hợp đồng thuê, hợp đồng dịch vụ và chế độ bảo hành.</li><li>Đảm bảo phản hồi nhanh chóng đối với những yêu cầu dịch vụ từ chủ hộ, nhân viên và ban quản lí cho công việc sửa chữa hoặc thay thế thiết bị.</li><li>Hỗ trợ trong việc chuẩn bị báo cáo ngân sách bảo trì và chi phí vốn. (Dự tính và quản lí chi phí cho các phụ tùng thiết bị...)</li><li>Thường xuyên xem xét hệ thống/ quy trình hoạt động hiện tại và đề xuất phương án cải thiện đối với tiêu chuẩn dịch vụ tổng quát và những thay đổi theo đó.</li><li>Thực hiện các công việc được giao bởi Quản lí Toà nhà.</li></ul></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><ul><li>Nam tuổi từ 28 đến 45 sức khỏe tốt</li><li>Tốt nghiệp Đại học trở lên chuyên ngành Điện, Nhiệt lạnh, Cơ khí</li><li>Có chứng chỉ quản lý vận hành tòa nhà chung cư</li><li>Có 5 năm kinh nghiệm làm việc trong quản lý tòa nhà, chung cư, trung tâm thương mại, khách sạn.</li><li>Có kiến thức về ngành điện, quản lý vận hành hệ thống điện, PCCC</li><li>Kỹ năng làm việc đội nhóm, phân tích dữ liệu</li><li>Tiếng Anh giao tiếp tốt</li></ul></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><ul><li>Thu nhập xứng đáng theo năng lực;</li><li>Cơ hội thăng tiến;</li><li>Đầy đủ BHXH, BHYT, BHTN, phép năm theo Luật định;</li><li>Lương thưởng tháng 13;</li><li>Du lịch, Teambuilding hàng năm;</li></ul></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>Hồ Chí Minh: 600A Điện Biên Phủ, P.22, Bình Thạnh</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>Thứ 2 - Thứ 7 (từ 08:00 đến 17:00)</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>1 người</p></blockquote>','1 - 3 năm','','Hồ Chí Minh: 600A Điện Biên Phủ, P.22, Bình Thạnh','Kỹ Sư Trưởng Dự Án - Chief Engineer','ACTIVE','2024-06-30 19:03:00.000000','','f942ea36-9841-4a75-a497-ce6bc259f208','0b394c4e-876c-48d6-a87f-49a7f6f3f305','f81c33ee-c562-4cc7-ae59-c9336eee6653'),('0f88ef51-4e72-43a1-927b-5c328244a615','2024-05-16 21:08:38.940993','2024-05-16 22:34:23.722244','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>123</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>123</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>123</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>345</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>456</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>678</p></blockquote>','Trên 10 năm','','Hồ Chí Minh','Front-end Developer','ACTIVE','2024-07-31 00:00:00.000000','','14baada3-7172-440a-a504-f345eae8e496','fad65e9b-9f07-4b12-8f92-6aceba45b690','f81c33ee-c562-4cc7-ae59-c9336eee6653'),('12f60d28-114c-48d9-99dd-d080227cebb8','2024-05-19 20:02:55.202596','2024-05-28 21:54:22.593644','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>&nbsp;</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>&nbsp;</p></blockquote>','Dưới 1 năm','','123','test','ACTIVE','2024-05-30 00:00:00.000000','','14baada3-7172-440a-a504-f345eae8e496','0b394c4e-876c-48d6-a87f-49a7f6f3f305','2f1a373e-1e5b-4bc7-b2ac-2c4659197e6c'),('18218d3a-f055-430b-b118-1b2fb22d3875','2024-06-05 10:24:43.450278','2024-06-19 22:53:02.480455','<h3><strong>Mô tả công việc:</strong></h3><blockquote><ul><li>Sinh viên tất cả các trường, không cần kinh nghiệm, cái hay là va chạm, lăn xả sẽ mang lại ta những bài học, mời bạn vào Công ty để va chạm, lăn xả. ( Nếu bạn biết trước PHP, Laravel là một lợi thế )</li><li>Nhanh nhẹn, yêu thích công việc kinh doanh, chịu được áp lực công việc</li><li>Năng động, thích tìm tòi, khám phá</li><li>Tinh thần học hỏi, có ý thức kỷ luật và tự giác cao</li><li>Thái độ làm việc tích cực và chuyên nghiệp</li><li>Kiên trì, cẩn thận, nhiệt tình, trách nhiệm</li><li>Sử dụng thành thạo vi tính văn phòng và Internet</li><li>Tự trang bị Laptop trong thời gian thực tập</li></ul></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><ul><li>Lương: Điểm 10 trong tầm tay + lương + thưởng tùy năng lực.</li><li>Không cần kinh nghiệm, cái hay là va chạm, lăn xả sẽ mang lại ta những bài học, do đó mình mời bạn vào Công ty để va chạm, lăn xả.</li></ul><p>Cơ hội phát triển của bạn:</p><ul><li>Môi trường thực tế chứ không phải lý thuyết suông</li><li>Được trải nghiệm trong một môi trường thực sự chuyên nghiệp, năng động;</li><li>Được training trong công việc để phát triển bản thân;</li><li>Được làm việc, cống hiến, đồng hành cùng với công ty.</li><li>Được xem xét, đánh giá năng lực để cộng tác lâu dài cùng những chế độ hấp dẫn tại Công ty</li></ul></blockquote>','Chưa có kinh nghiệm','5 triệu','Thành phố Hồ Chí Minh','Thực Tập Sinh Lập Trình Laravel - PHP','ACTIVE','2024-07-31 00:00:00.000000','10 Triệu','f942ea36-9841-4a75-a497-ce6bc259f208','0b394c4e-876c-48d6-a87f-49a7f6f3f305','b16097d7-a9a3-4211-8a78-c177195acf70'),('2e5ef60e-fc1c-4a60-9c38-fc70dac404bb','2024-05-05 17:21:04.395715','2024-05-13 17:49:05.110011','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>- Phân tích, lập chiến lược SEO tổng thể, SEO Onpage và Offpage.</p><p>- Phân tích từ khóa tiềm năng, lập kế hoạch link-building cho website.</p><p>- Phối hợp với nhóm nội dung để lập kế hoạch và triển khai nội dung cho website chuẩn SEO.</p><p>- Thực hiện tối ưu hóa Website với các công cụ tìm kiếm.</p><p>- Báo cáo công việc, vị trí từ khóa, lượng truy cập website hàng tháng.</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>- Có kiến thức cơ bản HTML, CSS. Có kiến thức SEO, có kinh nghiệm làm SEO 2 năm trở lên.</p><p>- Có kinh nghiệm quản trị Website.</p><p>- Sử dụng thành thạo các công cụ hỗ trợ SEO như: Google Search Console, Analytics, Ahref.</p><p>- Có kinh nghiệm SEO từ khóa tiếng Anh.</p><p>- Theo dõi, đánh giá, giám sát các kết quả SEO &amp; báo cáo thứ hạng từ khóa theo tuần/tháng/năm.</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>- Lương từ 10-12 triệu</p><p>- Được training nghiệp vụ trong quá trình làm việc.</p><p>- Có cơ hội phát triển, thăng tiến và khẳng định bản thân</p><p>- Môi trường chuyên nghiệp, trẻ trung, năng động</p><p>- Bảo hiểm và các quyền lợi lao động.</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>- Hồ Chí Minh: Tầng 16, Tòa nhà Metro Tower, 667 Điện Biên Phủ, Phường 25, Bình Thạnh</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>Từ sáng T2 đến hết sáng T7</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>3 người</p></blockquote>','1 - 3 năm','','Tầng 16, Tòa nhà Metro Tower, 667 Điện Biên Phủ, Phường 25, Bình Thạnh, Thành phố Hồ Chí Minh','Nhân Viên SEO','ACTIVE','2024-07-24 00:00:00.000000','','63b5eb65-60b4-4a48-b772-58c874ec17b7','2ba56fa7-eee9-4749-87b2-1ed91972d57c','86ce8d9a-3eda-4c3c-a649-8b02c22228a4'),('91e7ca47-4704-40ee-8a94-2cadb862227c','2024-05-12 18:01:32.801304','2024-06-16 15:43:59.426569','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>- Quản lý công việc sửa chữa, bảo trì các máy móc, thiết bị điện lạnh Công nghiệp/Kho lạnh/kho đông</p><p>- Tham gia lập kế hoạch và triển khai hoạt động cho bộ phận bảo trì theo định kỳ tuần/tháng/năm</p><p>- Quản lý các tài liệu kỹ thuật về máy móc thiết bị</p><p>- Thiết lập chi tiết các kế hoạch bảo trì, bảo dưỡng định kỳ cho nhà máy sản xuất</p><p>- Chịu trách nhiệm về hệ thống PCCC của nhà máy sản xuất</p><p>- Quản lý, bảo quản thiết bị, dụng cụ của bộ phận bảo trì</p><p>- Báo cáo định kỳ theo công việc được phân công.</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>- Tốt nghiệp Cao đẳng về kỹ thuật cơ khí/ điện/ Điện lạnh hoặc tương đương</p><p>- Có ít nhất 03 năm kinh nghiệm trong lĩnh vực Điện/ Điện lạnh/ Kho lạnh/ Kho mát công nghiệp</p><p>- Nam: có thể làm việc theo ca (8 tiếng/ ca)</p><p>- Kiến thức về hệ thống điện, sử dụng máy hàn và an toàn lao động.</p><p>Làm việc tại: Cổng B đường N3, KCN Đông Nam Củ Chi</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><ul><li>Bảo hiểm Y tế, BH tai nạn 24/7, BHXH 100%</li><li>Khám sức khỏe định kỳ</li><li>Nghỉ lễ theo quy định của nhà nước và quà tặng các ngày lễ trong năm</li><li>Môi trường làm việc có tính chủ động và độc lập cao</li><li>Các phúc lợi lương, thưởng theo quy định của tập đoàn và công ty</li></ul></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>- Hồ Chí Minh: CỔNG B ĐƯỜNG N3 KHU CÔNG NGHIỆP ĐÔNG NAM CỦ CHI, Củ Chi</p></blockquote>','3 - 5 năm','','Hồ Chí Minh: CỔNG B ĐƯỜNG N3 KHU CÔNG NGHIỆP ĐÔNG NAM CỦ CHI, Củ Chi','Nhân Viên Bảo Trì (Hệ Thống Lạnh)','ACTIVE','2024-07-20 15:43:00.000000','','8d5eb24e-7f2b-43fe-9bab-fe4a705d4ef2','0b394c4e-876c-48d6-a87f-49a7f6f3f305','87e042ca-d3fb-4a06-8b7e-0097071f2682'),('9daec45e-c80f-43d2-8055-d5cd4cdab0e5','2024-05-08 18:10:48.918459','2024-05-12 18:17:04.225922','<h3><strong>Mô tả công việc</strong></h3><p><strong>ABOUT THE JOB</strong></p><blockquote><ul><li>Design, prototype, and test the frontend and backend of our product</li><li>Follow excellent engineering practices, including design and architecture, iteration, documentation and testing, bug fixing, and maintenance</li><li>Collaborate with other developers to design, review, and optimize code</li><li>Implement and maintain scalable and high-performance web applications</li><li>Ensure optimal performance and responsiveness of the application</li><li>Utilize architectural strategies and design patterns in software development</li></ul></blockquote><h3><strong>Yêu cầu ứng viên</strong></h3><p><strong>ABOUT YOU</strong></p><blockquote><ul><li>Academic degree in Computer Science, Software Engineering, or a related field</li><li>Proficiency in SpringBoot, Restful, GraphQL, MyBatis, and Hibernate/JPA</li><li>At least 3 years of hands-on experience with React, Node.js, and JavaScript</li><li>Strong understanding of HTML5, CSS3/SCSS, and UI design principles</li><li>Good knowledge of Object-Oriented Programming concepts and design patterns</li><li>Experience with databases, including PostgreSQL and DynamoDB</li><li>Ability to write and optimize SQL queries</li><li>Familiarity with architectural strategies and design patterns in software development</li><li>Excellent problem-solving and analytical skills</li><li>Strong familiarity with version control tools like GIT</li><li>Experience with build tools like Maven or equivalent tools</li></ul></blockquote><h3><strong>Quyền lợi</strong></h3><p><strong>EQUAL OPPORTUNITY</strong></p><blockquote><p>Amaris Consulting is proud to be an equal opportunity workplace. We are committed to promoting diversity within the workforce and creating an inclusive working environment. For this purpose, we welcome applications from all qualified candidates regardless of gender, sexual orientation, race, ethnicity, beliefs, age, marital status, disability or other characteristics.</p></blockquote><p><strong>Why AMARIS?</strong></p><blockquote><ol><li>Skills Development: a Boost in your Career<ol><li>Yearly performance appraisals</li><li>Dynamic Promotions</li><li>Regular Project Reviews with Manager and Client</li><li>Customized career development</li><li>Attractive perspectives</li><li>Over 500 training courses in our ACADEMY catalogue</li><li>E-Leaning with UDEMY</li><li>Various Projects linked with Innovation &amp; Hi-Tech</li></ol></li><li>Exceptional Benefits<ol><li>Annual leaves</li><li>Private healthcare insurance and full salary starting from the Probation period</li><li>Medical checkup</li><li>Bonuses on Referrals and Business development</li><li>Gift for special occasions</li><li>Rewards</li></ol></li><li>Be Connected to a Community<ol><li>Team-buildings</li><li>Company Trips</li><li>Woman Day, Autumn Party</li><li>After-works</li><li>Social Network</li><li>Stimulating Working environment</li><li>Sports &amp; Gaming Activities</li><li>Hackathon</li></ol></li></ol></blockquote><h3><strong>Địa điểm làm việc</strong></h3><blockquote><p>- Hồ Chí Minh</p></blockquote>','3 - 5 năm','','Hồ Chí Minh','Java Full-Stack Developer','ACTIVE','2024-07-23 00:00:00.000000','','f942ea36-9841-4a75-a497-ce6bc259f208','0b394c4e-876c-48d6-a87f-49a7f6f3f305','f81c33ee-c562-4cc7-ae59-c9336eee6653'),('b8cf6e46-8900-43d3-9476-f884e7388206','2024-05-03 18:13:51.254983','2024-05-16 21:01:55.350548','<h3><strong>Mô tả công việc</strong></h3><blockquote><ul><li>Design, develop, and maintain responsive web applications using Angular, HTML, CSS, and TypeScript.</li><li>Collaborate with cross-functional teams to translate business requirements into technical solutions.</li><li>Develop and integrate backend APIs using Spring Boot and MongoDB.</li><li>Implement efficient database designs and optimize query performance.</li><li>Ensure code quality, scalability, and maintainability of the software applications.</li><li>Work closely with UX/UI designers to create intuitive user interfaces and experiences.</li><li>Write clean, modular, and well-documented code following best practices and coding standards.</li><li>Participate in code reviews, unit testing, and debugging to ensure the reliability and security of the applications.</li><li>Stay up-to-date with emerging technologies and industry trends to continuously improve software development processes.</li></ul></blockquote><h3><strong>Yêu cầu ứng viên</strong></h3><blockquote><ul><li>Bachelor\'s degree in Computer Science, Engineering, or related field.</li><li>2 years proven experience as a Full Stack Developer or similar role.</li><li>Proficiency in frontend development using Angular, HTML, CSS, and TypeScript.</li><li>Strong understanding of backend development with Java, Spring Boot and MongoDB.</li><li>Experience building RESTful APIs and integrating third-party services.</li><li>Solid understanding of software development principles, design patterns, and best practices.</li><li>Knowledge of containerization and deployment using Docker or similar tools.</li><li>Excellent problem-solving and analytical skills with a proactive attitude.</li><li>Ability to work independently and in a collaborative team environment.</li><li>Strong communication and interpersonal skills.</li><li>Experience with cloud platforms such as AWS, Azure, or Google Cloud Platform.</li><li>Familiarity with DevOps practices and CI/CD pipelines.</li><li>Knowledge of SQL and relational database management systems.</li><li>Understanding of agile methodologies and software development lifecycle.</li><li>Experience with version control systems like Git.</li></ul></blockquote><h3><strong>Quyền lợi</strong></h3><blockquote><ul><li>Competitive salary package with performance-based incentives.</li><li>Professional development opportunities and tuition reimbursement.</li><li>Collaborative and inclusive work culture with opportunities for growth and advancement.</li><li>If you are a passionate Full Stack Developer looking to join a dynamic team and make an impact in the technology industry, we encourage you to apply and become part of our journey towards innovation and success!</li></ul></blockquote><h3><strong>Địa điểm làm việc</strong></h3><blockquote><p>- Hồ Chí Minh: 80-82-84 Thăng Long, Phường 04, Tân Bình</p></blockquote>','1 - 3 năm','15 triệu','80-82-84 Thăng Long, Phường 04, Tân Bình, TP. HCM','Full Stack Developer (Lương 15-30 Triệu) - Hồ Chí Minh','ACTIVE','2024-07-31 00:00:00.000000','30 Triệu','f942ea36-9841-4a75-a497-ce6bc259f208','7aed7361-fb13-4897-993a-07ba5fcd4758','2f1a373e-1e5b-4bc7-b2ac-2c4659197e6c'),('cccd9c88-7263-431d-b795-2c1f46d72715','2024-05-13 17:48:01.287391','2024-05-13 17:51:03.987157','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>- Tiếp nhận, kiểm tra, xử lý các giấy tờ, hồ sơ trình lên Phó Tổng Giám đốc đảm bảo tính tuân thủ quy trình và quy định nội bộ;</p><p>- Quản lý sắp xếp lịch làm việc và hỗ trợ lên chương trình và hậu cần cho các chuyến công tác nội địa và quốc tế;</p><p>- Đầu mối trao đổi thông tin, lên chương trình, nội dung làm việc và tổ chức các cuộc họp, lập biên bản họp trong các cuộc họp của CEO với các đơn vị thành viên; phòng ban trực thực quản lý;</p><p>- Theo dõi, đôn đốc các đơn vị và phòng ban chức năng thực hiện các kết luận và yêu cầu của Giám Đốc;</p><p>- Thực hiện các yêu cầu công việc khác theo phân công.</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>- Nữ tốt nghiệp đại học trở lên;</p><p>- Có từ 1-3 năm kinh nghiệm làm việc tại vị trí Thư ký/ Trợ lý hoặc các vị trí tương đương</p><p>- Tư duy logic tốt; nhanh nhẹn, nhạy bén và chăm chỉ;</p><p>- Khả năng chịu áp lực công việc cao; sẵn sàng làm việc ngoài giờ theo yêu cầu công việc;</p><p>- Tiếng Anh thành thạo, giao tiếp tốt;</p><p>- Kỹ năng tin học văn phòng thành thạo;</p><p>- Yêu thích và định hướng làm việc trong môi trường Công nghệ</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>- Thời gian làm việc: Thứ Hai – Thứ Sáu</p><p>- Được làm việc với các doanh nghiệp, tập đoàn trong và ngoài nước ở nhiều lĩnh vực khác nhau</p><p>- Được học hỏi, đào tạo trong môi trường theo xu hướng công nghệ</p><p>- Môi trường làm việc thân thiện, năng động</p><p>- Được tham gia bảo hiểm đầy đủ theo quy định của pháp luật &amp; Khám sức khỏe định kỳ hàng năm. Được tham gia bảo hiểm FPTCare cho bản thân và gia đình;</p><p>- Du lịch/nghỉ mát cùng công ty hàng năm.</p><p>- Xem xét tăng lương hàng năm;</p><p>- Tham gia các hoạt động văn hoá, sự kiện hấp dẫn của Công ty FPT IS và Tập đoàn FPT.</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>Đà Nẵng</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>Thứ 2 - Thứ 6 (từ 08:30 đến 17:30)</p></blockquote>','1 - 3 năm','','Đà Nẵng','Thư Ký Phó Tổng Giám Đốc','ACTIVE','2024-06-11 00:00:00.000000','','0f59f7cb-ce95-481f-b05e-a479fc180ba7','2c31b8eb-5c6c-4dcb-88b6-eb88c1ae8ee9','f02c4ad4-d53a-42ed-ab10-09ba50fd5bea'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','2024-05-01 17:28:08.509699','2024-06-19 22:39:10.618774','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>– Trực tiếp thực thi các chiến dịch SEO</p><p>– Xem xét và đề xuất sửa lỗi các vấn đề kỹ thuật SEO</p><p>– Tối ưu hoá nội dung trang web, trang đích (Landing pages) và bản sao tìm kiếm phải trả tiền (paid search copy)</p><p>– Phát triển và thực hiện chiến lược xây dựng liên kết (link-building).</p><p>– Làm việc với các nhóm biên tập và tiếp thị để tối ưu SEO trong việc tạo nội dung và lập trình nội dung để đẩy thứ hạng các từ khoá, tăng traffic tìm kiếm cho trang web.</p><p>– Đo lường và kiểm soát chất lượng SEO, báo cáo định kỳ và đưa hướng giải quyết.</p><p>– Chạy quảng cáo google + Facebook + Youtube</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>– Có ít nhất 02 năm kinh nghiệm triển khai và thực hiện chiến dịch SEO.</p><p>– Ưu tiên các ứng viên đã SEO cho các trang web có đối tượng là nam, thu nhập cao.</p><p>– Ưu tiên các ứng viên đã SEO về tài chính, phần mềm, thể thao (show web đã đạt thứ hạng trên Google, show web có traffic organic search)</p><p>– Ứng viên đã xử lý được tác vụ thủ công của Google, bản quyền DMCA,..là 1 lợi thế</p><p>– Hiểu biết HTML, CSS và JavaScript,..</p><p>– Am hiểu về: redirect 301, 302, htaccess, robots.txt, thẻ meta, tối ưu hoá tốc độ trang web và các kỹ năng liên quan.</p><p>– Có hiểu biết về các tool SEO trên thị trường hiện nay: GSA, SEO Auto Pilot, RankerX, Kontent Machine, Lar...</p><p>– Có khả năng cập nhật, áp dụng tốt các xu hướng, thuật toán SEO mới.</p><p>– Sử dụng tốt các công cụ đo lường, phân tích, thống kê như: Google Analytics, NetInsight, Omniture, WebTrends, Google Search Console, Ahrefs, Moz,...</p><p>– Có kiến thức về mạng xã hội: Twitter, Facebook.</p><p>– Có kinh nghiệm về xây dựng liên kết và chiến lược lan truyền (viral).</p><p>– Có kỹ năng tổ chức, quản lý thời gian và lãnh đạo.</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>– Nghỉ phép và ngày nghỉ: Cung cấp chính sách nghỉ phép hợp lý và ngày nghỉ lễ để nhân viên có thể nghỉ ngơi, tái tạo năng lượng và du lịch.</p><p>– Lương và thưởng: Cung cấp mức lương cạnh tranh và chính sách thưởng hấp dẫn để đánh giá và động viên nhân viên.</p><p>– Hỗ trợ công việc: Cung cấp các phương tiện hỗ trợ công việc như máy tính xách tay, điện thoại di động, phần mềm và dịch vụ cần thiết để nhân viên làm việc hiệu quả.</p><p>– Phát triển nghề nghiệp: Cung cấp cơ hội đào tạo, học tập và phát triển cá nhân để nhân viên có thể nâng cao kỹ năng và tiến bộ trong sự nghiệp.</p><p>– Làm việc linh hoạt: Cung cấp chính sách làm việc linh hoạt như làm việc từ xa, làm việc theo giờ linh hoạt hoặc chế độ làm việc nửa ngày để tạo điều kiện thuận lợi cho sự cân bằng giữa công việc và cuộc sống.</p><p>– Môi trường làm việc thoải mái: Tạo ra một môi trường làm việc thoải mái, sáng tạo và đội ngũ đồng nghiệp hỗ trợ để thúc đẩy sự hài lòng và hiệu suất làm việc của nhân viên.</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>- Toàn Quốc</p></blockquote><h3><strong>Thời gian làm việc:</strong></h3><blockquote><p>Thứ 2 - Thứ 6 (từ 09:00 đến 18:00)</p></blockquote><h3><strong>Số lượng tuyển:</strong></h3><blockquote><p>Không giới hạn</p></blockquote>','3 - 5 năm','20','Toàn Quốc','Quản lý Tư Vấn Tuyển Sinh','ACTIVE','2024-08-29 00:00:00.000000','30 Triệu','1599002e-f534-41cd-84f9-8417baf828db','f2000544-c13e-4e72-a7f0-022ce450f9ea','86ce8d9a-3eda-4c3c-a649-8b02c22228a4'),('e5d5d5f0-8266-4386-96ec-36ae64505480','2024-05-13 18:13:51.254983','2024-05-12 18:17:30.668995','<h3><strong>Mô tả công việc:</strong></h3><blockquote><p>- Kiểm tra và xác nhận tính hợp lệ và chính xác của các chứng từ và hóa đơn.</p><p>- Làm việc cùng các kế toán nội bộ khác trong bộ phận để hoàn thành nhiệm vụ được giao.</p><p>- Sắp xếp và lưu trữ các giấy tờ theo trình tự đúng.</p><p>- Hạch toán các chứng từ và hóa đơn nội bộ.</p><p>- Quản lý và bảo mật thông tin trong các tài liệu doanh nghiệp.</p><p>- Thu thập và phân tích dữ liệu liên quan đến tình hình kinh doanh thực tế.</p><p>- Kiểm tra và theo dõi tình hình công nợ của khách hàng. Lập báo cáo về công nợ phải thu và công nợ phải trả.</p><p>- Nhập liệu về hoạt động bán hàng và mua hàng vào phần mềm máy tính. Lập hoá đơn và áp dụng chiết khấu cho khách hàng theo quy định.</p><p>- Quản lý tiền mặt của công ty được thực hiện một cách chính xác và đáng tin cậy. Cập nhật thông tin chi tiết vào quỹ tiền mặt của công ty</p><p>- Lập các uỷ nhiệm chi, séc rút tiền và nộp tiền vào tài khoản. Ngoài ra, có trách nhiệm quản lý và theo dõi nguồn tiền tại ngân hàng của công ty.</p><p>- Làm các việc khác liên quan theo sự phân công của trưởng phòng kế toán.</p></blockquote><h3><strong>Yêu cầu ứng viên:</strong></h3><blockquote><p>- Tốt nghiệp Cao đẳng, Đại học kế toán.</p><p>- Ít nhất 1 năm kinh nghiệm làm việc và sử dụng phần mềm kế toán.</p><p>- Nắm rõ các nghiệp vụ kế toán.</p><p>- Trung thực, chịu khó học hỏi và có tinh thần cầu tiến.</p><p>- Kỹ năng giao tiếp tốt, làm việc siêng năng và chăm chỉ</p><p>- Chịu được áp lực công việc, có khả năng làm việc độc lập &amp; làm việc nhóm.</p><p>- Độ tuổi: 22-30 tuổi</p></blockquote><h3><strong>Quyền lợi:</strong></h3><blockquote><p>- Mức lương: 8.000.000-12.000.000</p><p>- Các chế độ phúc lợi xã hội như: BHYT, BHXH, BH thất nghiệp, theo quy định của Luật lao động</p><p>- Khám sức khỏe định kỳ hàng năm</p></blockquote><h3><strong>Địa điểm làm việc:</strong></h3><blockquote><p>- Hồ Chí Minh: 71B-73 Calmette, p. Nguyễn Thái Bình, Quận 1</p></blockquote>','Dưới 1 năm','8.000.000 VNĐ','71B-73 Calmette, p. Nguyễn Thái Bình, Quận 1, Tp. Hồ Chí Minh','Kế Toán Tổng Hợp','ACTIVE','2024-06-30 00:00:00.000000','10.000.000 VNĐ','ee770f1b-5be1-4b3f-a227-fe28e186ca8f','fad65e9b-9f07-4b12-8f92-6aceba45b690','87e042ca-d3fb-4a06-8b7e-0097071f2682');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_tag`
--

DROP TABLE IF EXISTS `job_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_tag` (
  `job_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`job_id`,`tag_id`),
  KEY `FK29p8ktktwcn7vckxidib9rytx` (`tag_id`),
  CONSTRAINT `FK29p8ktktwcn7vckxidib9rytx` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  CONSTRAINT `FKf5nh7a1gtxg2edsspppoqxigd` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_tag`
--

LOCK TABLES `job_tag` WRITE;
/*!40000 ALTER TABLE `job_tag` DISABLE KEYS */;
INSERT INTO `job_tag` VALUES ('18218d3a-f055-430b-b118-1b2fb22d3875','11bf0035-d68b-481a-bd8e-d460bdec94e2'),('e5d5d5f0-8266-4386-96ec-36ae64505480','11bf0035-d68b-481a-bd8e-d460bdec94e2'),('12f60d28-114c-48d9-99dd-d080227cebb8','1cf85b93-b19b-4fb2-b6ec-d7b555d3ac1f'),('0d3c25c3-3556-4356-9c87-8e49b538440f','1e3ca9b6-cd69-4a21-96bd-0e3b243ac053'),('12f60d28-114c-48d9-99dd-d080227cebb8','1e3ca9b6-cd69-4a21-96bd-0e3b243ac053'),('12f60d28-114c-48d9-99dd-d080227cebb8','26fe7e1d-dd6b-43c6-8751-33296f7c5b3c'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','26fe7e1d-dd6b-43c6-8751-33296f7c5b3c'),('0f88ef51-4e72-43a1-927b-5c328244a615','289f9d27-71cd-49bf-9367-44ac7fa95dc1'),('2e5ef60e-fc1c-4a60-9c38-fc70dac404bb','289f9d27-71cd-49bf-9367-44ac7fa95dc1'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','289f9d27-71cd-49bf-9367-44ac7fa95dc1'),('cccd9c88-7263-431d-b795-2c1f46d72715','36c28dc8-2f46-442b-8e4a-e06c02c6f306'),('2e5ef60e-fc1c-4a60-9c38-fc70dac404bb','383cc955-6dc9-4238-9c1e-33761d5a719a'),('e5d5d5f0-8266-4386-96ec-36ae64505480','41e5c0c7-0952-403b-9951-2380eea7b0c9'),('9daec45e-c80f-43d2-8055-d5cd4cdab0e5','43450e9e-3f00-476c-adff-1d308442540c'),('0d3c25c3-3556-4356-9c87-8e49b538440f','5960e056-504a-43e5-bc42-5d0a13aacd27'),('18218d3a-f055-430b-b118-1b2fb22d3875','5960e056-504a-43e5-bc42-5d0a13aacd27'),('9daec45e-c80f-43d2-8055-d5cd4cdab0e5','5960e056-504a-43e5-bc42-5d0a13aacd27'),('b8cf6e46-8900-43d3-9476-f884e7388206','5960e056-504a-43e5-bc42-5d0a13aacd27'),('0f88ef51-4e72-43a1-927b-5c328244a615','dc7d6c30-386e-4043-bda0-348cba8cf3bf'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','dc7d6c30-386e-4043-bda0-348cba8cf3bf'),('087cb281-b9c2-4899-b1d2-e208255ca6d6','ed53efe1-94c5-4902-bafc-3ca8c207ac31'),('cccd9c88-7263-431d-b795-2c1f46d72715','ed53efe1-94c5-4902-bafc-3ca8c207ac31'),('087cb281-b9c2-4899-b1d2-e208255ca6d6','ee512283-5f48-4117-b896-b9cfe986d014'),('91e7ca47-4704-40ee-8a94-2cadb862227c','ee512283-5f48-4117-b896-b9cfe986d014'),('cccd9c88-7263-431d-b795-2c1f46d72715','ee512283-5f48-4117-b896-b9cfe986d014'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','ee512283-5f48-4117-b896-b9cfe986d014'),('e5d5d5f0-8266-4386-96ec-36ae64505480','ee512283-5f48-4117-b896-b9cfe986d014'),('0d3c25c3-3556-4356-9c87-8e49b538440f','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('18218d3a-f055-430b-b118-1b2fb22d3875','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('2e5ef60e-fc1c-4a60-9c38-fc70dac404bb','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('91e7ca47-4704-40ee-8a94-2cadb862227c','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('9daec45e-c80f-43d2-8055-d5cd4cdab0e5','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('b8cf6e46-8900-43d3-9476-f884e7388206','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('e0b7d0f9-db0b-43a8-bb22-ba6472e56109','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('e5d5d5f0-8266-4386-96ec-36ae64505480','f4702439-4bd3-468c-be5d-b78bfa3dce37'),('087cb281-b9c2-4899-b1d2-e208255ca6d6','f73f6b92-30b1-42f3-9ade-2d4ae4351391'),('0f88ef51-4e72-43a1-927b-5c328244a615','f73f6b92-30b1-42f3-9ade-2d4ae4351391');
/*!40000 ALTER TABLE `job_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `file` text COLLATE utf8mb4_unicode_ci,
  `application_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKilx4nfrunhu6u8vmhek3wnhic` (`application_id`),
  KEY `FKb3y6etti1cfougkdr0qiiemgv` (`user_id`),
  CONSTRAINT `FKb3y6etti1cfougkdr0qiiemgv` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKilx4nfrunhu6u8vmhek3wnhic` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES ('0d488477-d154-43c5-80cb-2dd1d2d6dc0d','2024-06-14 22:15:54.289298','2024-06-14 22:15:54.289298','test','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('1134d050-75ca-48d0-b542-52b984edd4b9','2024-05-13 18:39:02.431651','2024-05-13 18:39:02.431651','đọc rồi nha','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('1cced1e1-955e-4ef9-beab-45ecf031e8f5','2024-05-13 18:42:53.061918','2024-05-13 18:42:53.061918','','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/5d6e0657-316d-4dd6-8bb2-2953c0680a6d?alt=media','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('2604df1c-22e7-4eda-a8f5-cfc8014f8448','2024-06-19 13:42:42.530682','2024-06-19 13:42:42.530682','hi em','','5b036613-866a-45a4-bdab-ad386b20d371','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('26d28120-2b63-4b79-8bf1-9d24da4a1b24','2024-06-14 22:31:14.655886','2024-06-14 22:31:14.655886','99','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('28f81157-b7e7-427a-8ded-c53717ac5a9c','2024-06-14 22:18:44.352631','2024-06-14 22:18:44.352631','chào','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('2ad3737c-ea19-43a3-b82c-93895c7b4193','2024-06-17 19:51:18.964388','2024-06-17 19:51:18.964388','em gui aj','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/e5d5e415-3130-4716-a94a-4ced14c74d6b?alt=media','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','3b61bcc7-b448-494f-851f-371487487149'),('2e67a288-4f97-4248-aa87-5e32d367a74a','2024-06-18 22:01:48.712074','2024-06-18 22:01:48.712074','111','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','3b61bcc7-b448-494f-851f-371487487149'),('33affd9f-0f19-4a37-9597-893c420f71dd','2024-06-14 22:36:10.931905','2024-06-14 22:36:10.931905','asc','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('36963523-0dfc-45ab-acfb-d1342595a20c','2024-06-05 10:20:55.981284','2024-06-05 10:20:55.981284','Xin chào bạn?','','bb4e533d-b945-490a-b8ba-20f5b049b7ef','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('38617f0b-b737-4c16-b0a0-d288eb68710e','2024-06-14 22:24:05.145848','2024-06-14 22:24:05.145848','9999','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('3d4317f2-07f3-48fa-a3c6-4f06fb10326d','2024-06-14 22:31:46.353932','2024-06-14 22:31:46.353932','test v1','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('3f4d72fd-006c-4057-a026-8dea226c3820','2024-06-14 22:14:53.490752','2024-06-14 22:14:53.490752','2','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('46dce015-db7f-41bc-b6eb-0d64ef54574d','2024-06-18 22:01:29.994465','2024-06-18 22:01:29.994465','000','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','3b61bcc7-b448-494f-851f-371487487149'),('6351af6a-40d0-4db0-a73d-25f5c7a3f57f','2024-06-18 16:20:19.363947','2024-06-18 16:20:19.363947','oke','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('67e95ab9-5ca0-402f-bf65-e430a5b3b5e7','2024-06-14 22:24:23.491776','2024-06-14 22:24:23.491776','8888','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('6e1a6185-adf4-4b3e-8159-8b5f010bf7e8','2024-06-14 22:32:08.792853','2024-06-14 22:32:08.792853','??','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('7e0a4352-1aa9-470f-999a-63789426292d','2024-06-17 19:50:43.624452','2024-06-17 19:50:43.624452','Em chào anh ạ??','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','3b61bcc7-b448-494f-851f-371487487149'),('7f22a080-1acc-43fe-a4ec-4391b2059520','2024-05-12 20:20:13.392942','2024-05-12 20:20:13.392942','hi?','','c60b834a-053c-4ad6-941b-00dc3050a02b','8c8c69b3-87e1-4170-bc1e-6bbe0c27d3c8'),('8dc16e0a-9d7f-4c60-8185-af74d205e8ab','2024-06-14 22:36:21.461465','2024-06-14 22:36:21.461465','des','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('8fca9708-9e13-4111-96e4-b72dc32dd91d','2024-06-14 22:50:34.430017','2024-06-14 22:50:34.430017','xin chào','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('950c2c26-1b41-4403-be09-40f410c7b109','2024-06-14 22:06:36.634189','2024-06-14 22:06:36.634189','xin chào','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('9c563719-0665-4fc6-ade5-733090fb890e','2024-06-14 22:07:06.911693','2024-06-14 22:07:06.911693','hi','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('9eac3fef-0e1e-417a-9eca-66346cd9c739','2024-05-13 18:42:46.994713','2024-05-13 18:42:46.994713','12','','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('a9b842a4-c704-459a-ace0-e3bedc6724e7','2024-05-12 21:26:45.924299','2024-05-12 21:26:45.924299','duyệt cho em với anh trai','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('b1f0964c-f3dd-41a5-bf9a-e72495c392f8','2024-06-18 22:01:19.031958','2024-06-18 22:01:19.031958','999','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','3b61bcc7-b448-494f-851f-371487487149'),('d7d68a74-0a1e-4b5d-abb3-92a54fa64126','2024-06-17 19:50:51.486900','2024-06-17 19:50:51.486900','chào em','','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e'),('d7e31bc8-35c2-4423-b2df-5497bb78a3c6','2024-05-12 21:26:22.560508','2024-05-12 21:26:22.560508','Em chào anh?','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('de8b41fd-0e83-4d19-8904-24189b693d45','2024-06-14 22:33:35.750728','2024-06-14 22:33:35.750728','oke oke','','c60b834a-053c-4ad6-941b-00dc3050a02b','3b61bcc7-b448-494f-851f-371487487149'),('eb4031fc-de0e-4eaf-a409-cbd7a73a28db','2024-05-13 18:39:37.379596','2024-05-13 18:39:37.379596','1','https://firebasestorage.googleapis.com/v0/b/jobapp-c9389.appspot.com/o/75d7d878-2cc1-46e9-948c-181c8c86ae3f?alt=media','c60b834a-053c-4ad6-941b-00dc3050a02b','776138ab-4c2c-4c7e-9e79-7d8281a2ad1e');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `process` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `employer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr4ibsqdxkngawysnebu6finpx` (`employer_id`),
  CONSTRAINT `FKr4ibsqdxkngawysnebu6finpx` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
INSERT INTO `process` VALUES ('2f1a373e-1e5b-4bc7-b2ac-2c4659197e6c','2024-05-12 17:26:02.150962','2024-05-12 17:26:02.150962','Áp dụng với tin tuyển dụng Intern, Fresher','Quy trình 2 bước','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('6692a463-cfd0-45d0-92f0-134ff25d9546','2024-06-05 08:32:53.715527','2024-06-05 08:32:53.715527','','Quy trình 3 bước','9e6fed88-82a4-43d6-965b-8fbe74234343'),('86ce8d9a-3eda-4c3c-a649-8b02c22228a4','2024-05-12 17:53:59.960354','2024-05-12 17:53:59.960354','','Quy trình 2','6c32a422-f749-413c-a032-44c86d0ba7b8'),('87e042ca-d3fb-4a06-8b7e-0097071f2682','2024-05-12 17:23:26.501134','2024-05-12 17:23:26.501134','Áp dụng với tin tuyển dụng 1','Quy trình 1 bước','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('a8cb9881-8ce2-4d1f-9fe1-21d699c89fba','2024-05-12 17:53:28.440514','2024-05-12 17:53:28.440514','Quy trinh 1','Quy trinh 1','6c32a422-f749-413c-a032-44c86d0ba7b8'),('b16097d7-a9a3-4211-8a78-c177195acf70','2024-06-05 10:23:12.810958','2024-06-05 10:23:12.810958','Quy trình 3 Bước','Quy trình phỏng vấn TTS','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('e055907a-d94b-4099-a3e0-3634aa3447dc','2024-05-12 17:33:15.895151','2024-05-12 17:33:15.895151','Áp dụng cho quy trình phỏng vấn Phó Giám đốc phần mềm','Quy trình phỏng vấn Giám đốc phần mềm','d4b4525c-c2b4-499a-aa50-491fba2ab238'),('f02c4ad4-d53a-42ed-ab10-09ba50fd5bea','2024-05-13 17:37:35.758244','2024-05-13 17:37:35.758244','Quy trình dành cho mọi trường hợp phỏng vấn','Quy trình cơ bản','fab1cd32-0ecf-42c0-894a-f767ceb21c37'),('f81c33ee-c562-4cc7-ae59-c9336eee6653','2024-05-12 17:28:18.087784','2024-05-12 17:28:18.087784','Áp dụng với Junior, senior','Quy trình 3 bước','d4b4525c-c2b4-499a-aa50-491fba2ab238');
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saved_job`
--

DROP TABLE IF EXISTS `saved_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saved_job` (
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `job_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`candidate_id`,`job_id`),
  KEY `FKrq45qmvh9ecwfp3ww753thk3t` (`job_id`),
  CONSTRAINT `FKk5o0vww7p84o3ajya6rn9nu24` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`),
  CONSTRAINT `FKrq45qmvh9ecwfp3ww753thk3t` FOREIGN KEY (`job_id`) REFERENCES `job` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saved_job`
--

LOCK TABLES `saved_job` WRITE;
/*!40000 ALTER TABLE `saved_job` DISABLE KEYS */;
INSERT INTO `saved_job` VALUES ('2cf42a59-3a31-4cf3-9374-a438b4a6fc59','91e7ca47-4704-40ee-8a94-2cadb862227c'),('26e2799a-d41e-4a00-9782-7fe825f54128','9daec45e-c80f-43d2-8055-d5cd4cdab0e5'),('2cf42a59-3a31-4cf3-9374-a438b4a6fc59','9daec45e-c80f-43d2-8055-d5cd4cdab0e5'),('2cf42a59-3a31-4cf3-9374-a438b4a6fc59','b8cf6e46-8900-43d3-9476-f884e7388206'),('6e59aea8-a862-4403-ae0c-ca330df231e8','e5d5d5f0-8266-4386-96ec-36ae64505480');
/*!40000 ALTER TABLE `saved_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule`
--

DROP TABLE IF EXISTS `schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime(6) NOT NULL,
  `application_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `FKddi6m98h6bdgfvnlusktilxnw` (`application_id`),
  CONSTRAINT `FKddi6m98h6bdgfvnlusktilxnw` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule`
--

LOCK TABLES `schedule` WRITE;
/*!40000 ALTER TABLE `schedule` DISABLE KEYS */;
INSERT INTO `schedule` VALUES ('c4ea6057-2426-4d86-ac54-fe51999c3837','2024-06-19 17:22:44.613230','2024-06-19 22:35:32.309516','#3498DB','2024-06-21 09:30:00.000000','B1: Test kĩ năng','2024-06-21 08:30:00.000000','e7fc0988-39d0-4bd0-ad3c-3fa2ab7ca441','Phỏng vấn online');
/*!40000 ALTER TABLE `schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sequence` int NOT NULL,
  `skill` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `candidate_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt9gabgotqtfwfiyj13e92lnac` (`candidate_id`),
  CONSTRAINT `FKt9gabgotqtfwfiyj13e92lnac` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES ('0526fe39-4c6c-4c76-a38d-6f3c4cfb8ac5','2024-06-20 00:35:15.134576','2024-06-20 00:35:15.134576','Thành thạo các phương pháp kiểm thử như kiểm thử chức năng, kiểm thử phi chức năng, kiểm thử hồi quy, kiểm thử tự động và kiểm thử thủ công.',1,'Kiểm thử','c9fa5d74-81f6-449d-a3ba-ad5d78c179b3'),('0ce063b1-11c3-48c5-9bda-553aaa0163d5','2024-06-13 19:39:07.485148','2024-06-13 19:39:07.485148','Have experience with Spring Boot, RESTful Web Services, JPA, Spring Security...',1,'Back-end','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('2d8c930f-1f30-4d80-99d0-cec896d574ab','2024-06-20 00:28:19.110395','2024-06-20 00:28:19.110395','Bạn cần hiểu rõ sản phẩm hoặc dịch vụ mà mình bán, từ tính năng, lợi ích đến cách sử dụng. Kiến thức sâu rộng giúp bạn tư vấn chính xác và tạo sự tin tưởng từ khách hàng',2,'Hiểu biết sản phẩm/dịch vụ','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('38330126-e9fb-4d96-aa93-16412af56318','2024-06-19 23:31:36.520125','2024-06-19 23:31:36.520125','Thành thạo',1,'CSS','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('42716744-42d6-42f8-8636-49afe835676f','2024-06-19 23:31:36.522828','2024-06-19 23:31:36.522828','Giao tiếp như người bản xứ',5,'Tiếng anh','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('5069a16c-7f3f-491e-88e3-2e4606230d20','2024-06-19 23:31:36.522828','2024-06-19 23:31:36.522828','Thành thạo',3,'Nodejs','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('58c1e0e6-2cc5-44fe-a5bc-5ba5399bb1ab','2024-05-12 11:32:49.127880','2024-05-12 11:32:49.127880','Giao tiếp căn bản',3,'Tiếng anh','26e2799a-d41e-4a00-9782-7fe825f54128'),('6f14ffb4-5f84-40e7-add7-c8dbae7fe794','2024-06-13 19:39:07.486146','2024-06-13 19:39:07.486146','Skilled in using Microsoft SQL Server and MySQL for managing data. Know how to design data tables, connect them, and write more advanced questions. Also, make sure the data looks good and is correct.',2,'Database management','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('6f23bf2c-d625-4120-aa93-0875410c4be1','2024-06-13 19:39:07.484145','2024-06-13 19:39:07.484145','Knowledgeable in Router, React Hook, Redux, Redux Toolkit. Understanding of CSS Frameworks, such as Tailwind CSS, Bootstrap and preprocessors like SCSS.',0,'Front-end','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('8dd8c264-630a-474e-b454-d07c9afd5f93','2024-06-20 00:35:15.134576','2024-06-20 00:35:15.134576','Khả năng phân tích hệ thống, xác định nguyên nhân gốc rễ của lỗi và đề xuất giải pháp khắc phục.',3,'Giải quyết vấn đề','c9fa5d74-81f6-449d-a3ba-ad5d78c179b3'),('95799b2f-77d0-45fd-befe-5f8a8c11f28e','2024-06-20 00:35:15.134576','2024-06-20 00:35:15.134576','Kinh nghiệm với các công cụ kiểm thử như Selenium, JIRA, TestRail, và Postman.',2,'Công nghệ','c9fa5d74-81f6-449d-a3ba-ad5d78c179b3'),('a109c0b7-6ae0-40e8-bc23-3eb06cae879d','2024-06-19 23:31:36.522828','2024-06-19 23:31:36.522828','Thành thạo',4,'PostgreSQL','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('bb3288ac-a7f5-44d3-b941-2aa5a1b5ed78','2024-06-13 19:39:07.486146','2024-06-13 19:39:07.486146','Sử dụng căn bàn',3,'Git, SVN','8adf1cbb-5579-483b-8dad-7f5507a7ac33'),('bb3d4c95-d93a-42f5-a726-8b25fd5cd111','2024-05-12 11:32:49.126908','2024-05-12 11:32:49.126908','Làm việc nhóm, thuyết trình lưu loát, hiệu quả',2,'Làm việc nhóm, thuyết trình','26e2799a-d41e-4a00-9782-7fe825f54128'),('be4632a8-3687-4035-9332-ca775e5ee80a','2024-06-20 00:28:19.112394','2024-06-20 00:28:19.112394','Thành thạo các công cụ quản lý khách hàng (CRM), phần mềm bán hàng và các công cụ marketing trực tuyến giúp bạn làm việc hiệu quả hơn',4,'Công nghệ','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('c1137664-881b-42d2-b57d-efee81c1283e','2024-05-12 11:11:58.475756','2024-05-12 11:11:58.475756','',3,'Xử lý hồ sơ','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('dc7e866d-c7f6-42de-9c14-8e9b83c254e8','2024-05-12 11:32:49.124914','2024-05-12 11:32:49.124914','Sử dụng thành thạo phần mềm photoshop, Ai..',1,'Photoshop, Ai','26e2799a-d41e-4a00-9782-7fe825f54128'),('e4c9d457-681f-4f65-8beb-86c497464161','2024-05-12 11:11:58.472788','2024-05-12 11:11:58.472788','Thành thạo MS Word, Excel, PowerPoint...',1,'Tin học văn phòng','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('e59a1988-0dd5-4855-8a50-cecab3124e0f','2024-06-19 23:31:36.520125','2024-06-19 23:31:36.520125','Thành thạo',2,'ReactJS','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('ec316bfc-33a5-44f7-85c9-1eacb9153b3d','2024-06-20 00:28:19.109395','2024-06-20 00:28:19.109395','Là một nhân viên Sale, kỹ năng giao tiếp là vô cùng quan trọng. Bạn cần có khả năng truyền đạt thông tin rõ ràng, lắng nghe khách hàng và tạo mối quan hệ tốt với họ. Giao tiếp tốt giúp bạn hiểu được nhu cầu của khách hàng và tư vấn sản phẩm hoặc dịch vụ phù hợp.',1,'Giao tiếp','ed45f0a9-fea3-4df9-91bf-d0409b1bb964'),('f4e42f4b-086e-431e-9275-3a29a9b90047','2024-05-12 11:11:58.474756','2024-05-12 11:11:58.474756','Toiec 750, giao tiếp thành thạo',2,'Tiếng Anh','2cf42a59-3a31-4cf3-9374-a438b4a6fc59'),('f9c4f137-7028-4693-a25a-adc2cada27f4','2024-06-19 23:31:36.517754','2024-06-19 23:31:36.517754','Thành thạo',0,'HTML','bc03a971-9fd2-4e70-a92b-95d2449f0a11'),('fcc6bec9-b79b-40eb-822e-3193f5f7bc08','2024-06-20 00:28:19.111395','2024-06-20 00:28:19.111395','Quản lý thời gian hiệu quả giúp bạn xử lý nhiều khách hàng và công việc cùng một lúc. Bạn cần biết cách ưu tiên nhiệm vụ và sắp xếp lịch trình hợp lý',3,'Quản lý thời gian','ed45f0a9-fea3-4df9-91bf-d0409b1bb964');
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `step` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` int NOT NULL,
  `process_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdn3asr8ki6ww6p59shdo966wc` (`number`,`process_id`),
  KEY `FKo7rybkdmgydiosgamgr15dqnh` (`process_id`),
  CONSTRAINT `FKo7rybkdmgydiosgamgr15dqnh` FOREIGN KEY (`process_id`) REFERENCES `process` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `step` DISABLE KEYS */;
INSERT INTO `step` VALUES ('064f28ec-0e4a-4ddc-8576-b8f5bfa59a58','2024-05-12 17:28:18.105862','2024-05-12 17:28:18.105862','Nhà tuyển dụng sẽ duyệt CV sau khi bạn ứng tuyển công việc','Duyệt CV',0,'f81c33ee-c562-4cc7-ae59-c9336eee6653'),('10871afd-2254-4b31-b99a-1b691a155ee1','2024-05-13 17:37:35.778911','2024-05-13 17:37:35.778911','Nhà tuyển dụng sẽ duyệt cv của bạn sau khi bạn ứng tuyển','Nhận CV',0,'f02c4ad4-d53a-42ed-ab10-09ba50fd5bea'),('1439750a-dcee-45cb-9219-d57a30f6581b','2024-06-05 10:23:12.820529','2024-06-05 10:23:12.820529','Thỏa thuận','Bước 3',2,'b16097d7-a9a3-4211-8a78-c177195acf70'),('3215f11d-d315-4065-b7ad-a786fe326b38','2024-06-05 08:32:53.738528','2024-06-05 08:32:53.738528','Thỏa thuận','Mô tả bước 3',2,'6692a463-cfd0-45d0-92f0-134ff25d9546'),('3a2ca009-7cb4-4895-bc98-782d8a6a2d09','2024-05-12 17:28:18.115880','2024-05-12 17:28:18.115880','Phỏng vấn với Leader cùa team về kiến thức chuyên môn','Phỏng vấn với Leader',1,'f81c33ee-c562-4cc7-ae59-c9336eee6653'),('4a36b73a-51a7-4784-9384-4af236a202a9','2024-05-12 17:28:18.105862','2024-05-12 17:28:18.105862','Thỏa thuận và deal lương','Thỏa thuận',2,'f81c33ee-c562-4cc7-ae59-c9336eee6653'),('4f60f972-7274-4c5c-bee8-6775e1e229d6','2024-05-13 17:37:35.796593','2024-05-13 17:37:35.796593','Thời gian khoảng 2 tiếng đến 4 tiếng','Phỏng vấn offline',2,'f02c4ad4-d53a-42ed-ab10-09ba50fd5bea'),('5d6d3894-3987-4907-87d0-860e588a017a','2024-06-05 08:32:53.726528','2024-06-05 08:32:53.726528','Duyệt CV','Bước 1',0,'6692a463-cfd0-45d0-92f0-134ff25d9546'),('61ecb699-93ce-4f49-9dc0-7e571d23f4a6','2024-05-13 17:37:35.790059','2024-05-13 17:37:35.790059','Thời gian khoảng 30 phút đến 1 tiếng','Phỏng vấn online',1,'f02c4ad4-d53a-42ed-ab10-09ba50fd5bea'),('64561d49-772e-4be7-b53b-4d928d9e6d34','2024-05-12 17:26:02.161441','2024-05-12 17:26:02.161441','Phỏng vấn với Leader cùa team về kiến thức chuyên môn','Phỏng vấn với Leader',1,'2f1a373e-1e5b-4bc7-b2ac-2c4659197e6c'),('645a119f-73cc-4cbf-b74b-311bfe5e54c9','2024-05-12 17:53:28.452092','2024-05-12 17:53:28.452092','','Phỏng vấn online',1,'a8cb9881-8ce2-4d1f-9fe1-21d699c89fba'),('71ac200c-6d1a-43ff-81b4-63d4418b04bf','2024-05-12 17:53:59.960354','2024-05-12 17:53:59.960354','','Phỏng vấn trực tiếp',1,'86ce8d9a-3eda-4c3c-a649-8b02c22228a4'),('7671c69b-1c4f-4128-8bba-ff7a757b2217','2024-05-12 17:33:15.944931','2024-05-12 17:33:15.944931','Phỏng vấn với Giám đốc về kiến thức quản trị','Phỏng vấn buổi 2',2,'e055907a-d94b-4099-a3e0-3634aa3447dc'),('8bf357d7-30ff-4ad3-b18a-cc45d63355b7','2024-05-12 17:23:26.515654','2024-05-12 17:23:26.515654','Nhà tuyển dụng sẽ duyệt CV của bạn sau khi bạn ứng tuyển công việc','Duyệt CV',0,'87e042ca-d3fb-4a06-8b7e-0097071f2682'),('9cabc509-bc2a-4e3f-84ff-4710b11817a6','2024-06-05 10:23:12.820529','2024-06-05 10:23:12.820529','Duyệt hồ sơ','Bước 1',0,'b16097d7-a9a3-4211-8a78-c177195acf70'),('9d399f47-2f7d-4efd-811d-9271e739964b','2024-05-12 17:33:15.915007','2024-05-12 17:33:15.915007','Phỏng vấn với Giám đốc về kiến thức chuyên môn','Phỏng vấn buổi 1',1,'e055907a-d94b-4099-a3e0-3634aa3447dc'),('a5265494-b9fd-4814-9683-87f6cb0e81f7','2024-06-05 08:32:53.734527','2024-06-05 08:32:53.734527','Trao đổi về kĩ năng','Bước 2',1,'6692a463-cfd0-45d0-92f0-134ff25d9546'),('bb11c1f4-545a-4bea-9fd4-7d58f0b7fadb','2024-05-12 17:26:02.156495','2024-05-12 17:26:02.156495','Nhà tuyển dụng sẽ duyệt CV sau khi bạn ứng tuyển công việc','Duyệt CV',0,'2f1a373e-1e5b-4bc7-b2ac-2c4659197e6c'),('c21dd7a0-d771-48c5-a960-a27c72801d0b','2024-05-12 17:53:59.960354','2024-05-12 17:53:59.960354','','Duyệt CV',0,'86ce8d9a-3eda-4c3c-a649-8b02c22228a4'),('cfa6855d-1b46-4569-a374-4043e82472a1','2024-05-12 17:33:15.936241','2024-05-12 17:33:15.936241','Thỏa thuận và deal lương','Thỏa ',3,'e055907a-d94b-4099-a3e0-3634aa3447dc'),('e1bb9f67-bf6b-461a-a6fc-1d5fc21a3f22','2024-05-12 17:53:28.450682','2024-05-12 17:53:28.450682','','Phỏng vấn trực tiếp',2,'a8cb9881-8ce2-4d1f-9fe1-21d699c89fba'),('eb7382d9-8124-40ce-b3c0-09f0839ce091','2024-05-12 17:53:28.452092','2024-05-12 17:53:28.452092','','Duyệt CV',0,'a8cb9881-8ce2-4d1f-9fe1-21d699c89fba'),('fc5e89aa-de2f-4e2b-a796-aff7176b5f34','2024-06-05 10:23:12.820529','2024-06-05 10:23:12.820529','Phỏng vấn với Leader','Bước 2',1,'b16097d7-a9a3-4211-8a78-c177195acf70'),('fda04faf-9f2f-4228-b5d1-a201a9387119','2024-05-12 17:33:15.925268','2024-05-12 17:33:15.925268','Nhà tuyển dụng sẽ duyệt CV sau khi bạn ứng tuyển công việc','Duyệt CV',0,'e055907a-d94b-4099-a3e0-3634aa3447dc');
/*!40000 ALTER TABLE `step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1wdpsed5kna2y38hnbgrnhi5b` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES ('11bf0035-d68b-481a-bd8e-d460bdec94e2','2024-05-12 17:05:36.460861','2024-05-12 17:05:36.460861','#ff0065','Intern'),('1cf85b93-b19b-4fb2-b6ec-d7b555d3ac1f','2024-05-12 17:05:12.530651','2024-05-12 17:05:12.530651','#ff008b','Remote'),('1e3ca9b6-cd69-4a21-96bd-0e3b243ac053','2024-05-12 17:10:48.699691','2024-05-12 17:10:48.699691','#76ff00','Trưởng phòng'),('26fe7e1d-dd6b-43c6-8751-33296f7c5b3c','2024-05-12 17:03:07.826050','2024-05-12 17:03:07.826050','#10ff31','Buôn Mê Thuật'),('289f9d27-71cd-49bf-9367-44ac7fa95dc1','2024-05-12 17:02:33.367827','2024-05-12 17:02:33.367827','#1472d0','Hà Nội'),('36c28dc8-2f46-442b-8e4a-e06c02c6f306','2024-05-12 17:11:26.881396','2024-05-12 17:11:26.881396','#ff00ef','Thư kí'),('383cc955-6dc9-4238-9c1e-33761d5a719a','2024-05-12 17:04:59.422117','2024-05-12 17:04:59.422117','#ffaf00','Part Time'),('38b18059-de68-4d76-9b99-668d1244c194','2024-05-12 17:07:14.560188','2024-05-12 17:07:14.560188','#ff9000','Phần cứng'),('41e5c0c7-0952-403b-9951-2380eea7b0c9','2024-05-12 17:05:46.970993','2024-05-12 17:05:46.970993','#00ff3e','Fresher'),('43450e9e-3f00-476c-adff-1d308442540c','2024-05-12 17:06:00.431529','2024-05-12 17:06:00.431529','#ffa700','Senior'),('5960e056-504a-43e5-bc42-5d0a13aacd27','2024-05-12 17:11:58.599359','2024-05-12 17:11:58.599359','#16385b','CNTT'),('5af2b077-f95e-4c23-ad28-52a4a8fcfc1d','2024-05-12 17:07:26.980335','2024-05-12 17:07:26.980335','#fad800','Kế toán'),('7008c35c-45c6-4c93-bd75-826c9b246ad2','2024-05-12 17:03:20.305701','2024-05-12 17:03:20.305701','#0cfcef','Cần Thơ'),('83ca1310-e6da-4608-9ec0-192e1465e423','2024-05-12 17:07:00.030187','2024-05-12 17:07:00.030187','#0b65bf','Phần mềm'),('bde6663e-737d-4bd4-b4c4-bc4d4862108e','2024-05-12 17:09:34.239588','2024-05-12 17:09:34.239588','#00ffea','Chứng khoán'),('c6bbdf60-2c10-49db-bf66-9d0d6858f31f','2024-05-12 17:11:04.714149','2024-05-12 17:11:04.714149','#ff00d0','Giám đốc'),('dc7d6c30-386e-4043-bda0-348cba8cf3bf','2024-05-12 17:11:40.099582','2024-05-12 17:11:40.099582','#ff00aa','Quản lý'),('ea3fc5a8-f0b2-4d66-bddc-5224a965953c','2024-05-12 17:11:18.189620','2024-05-12 17:11:18.189620','#123d68','Phó giám đốc'),('ed53efe1-94c5-4902-bafc-3ca8c207ac31','2024-05-12 17:02:46.311041','2024-05-12 17:02:46.311041','#3485d6','Đà Nẵng'),('ee512283-5f48-4117-b896-b9cfe986d014','2024-05-12 17:04:45.091852','2024-05-12 17:04:45.091852','#f1ff00','Full time'),('f4702439-4bd3-468c-be5d-b78bfa3dce37','2024-05-12 17:02:20.163417','2024-05-12 17:02:20.163417','#007ffd','Hồ Chí Minh'),('f73f6b92-30b1-42f3-9ade-2d4ae4351391','2024-05-16 16:51:38.167937','2024-05-16 16:51:38.167937','#0b83fb','Văn phòng');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','CANDIDATE','EMPLOYER','HR') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('ACTIVE','PENDING','INACTIVE','DELETED','PAUSED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('00183215-5464-41e2-982e-13141af08b78','2024-05-12 17:48:02.634995','2024-05-17 17:23:50.032713','hr2@gmail.com','$2a$10$rZwN/P65Aa4vYybVmpIm8ugznubFAMqKLKxqQhI9rnhPzUNu3SRVe','HR','INACTIVE'),('0963332b-27d9-4949-ae23-b534fdf674dd','2024-05-12 16:29:30.078305','2024-05-12 16:43:45.744844','employer6@gmail.com','$2a$10$C.85x5wYMwo2VTUdBK5poezfCepZzB47orzK0x1J/Xv3jpSSXKWPy','EMPLOYER','ACTIVE'),('098349fa-e9e1-41c7-8404-b07947a3a66d','2024-06-05 08:33:44.138303','2024-06-05 08:33:44.138303','hr100','$2a$10$zLG9kEjHyz1Y2CK8VhZ36.kN5ZPH9s4A7ESvmPI44ARHwqH02B38O','HR','ACTIVE'),('143bf3b7-f1d1-4c8e-88c2-13e781accd47','2024-05-12 10:47:54.922190','2024-05-12 10:47:54.922190','candidate4@gmail.com','$2a$10$lVPGcHyZ1bPO/kWm1vJ38.YvyER4mVtesCcqDFdiZbcKpIwkQasa2','CANDIDATE','ACTIVE'),('15015b3a-3192-4b87-80f8-febc415d6476','2024-06-20 00:18:13.841888','2024-06-20 00:18:13.841888','candat0201@gmail.com','$2a$10$kL6g5stWLiBkIHc.h0zexuSZFwu7z/3lef/A6sfdFChZVGZV2lM/e','CANDIDATE','ACTIVE'),('2eb13c86-dee8-4650-8e7e-16f3780fdaac','2024-05-12 16:34:44.204090','2024-06-16 14:46:52.162855','employer10@gmail.com','$2a$10$D8XJRgVUf1zm.xhSXjra4OvAPGKHndmpx3T2jf/cHROTuQFd2cT82','EMPLOYER','ACTIVE'),('350737c2-fa83-4aed-8eba-2425ba5cbd88','2024-06-20 00:31:42.092838','2024-06-20 00:31:42.092838','canhuyen0209@gmail.com','$2a$10$07sJOjYPFAXkaDII1CnfHeTYwUPwlx3NlNFXuUZSIAuk5itYNl99G','CANDIDATE','ACTIVE'),('3b61bcc7-b448-494f-851f-371487487149','2024-05-12 10:47:08.447325','2024-06-17 18:19:02.488356','phamtanhoang3202@gmail.com','$2a$10$0e.vvZcWP45S0w1rW8qP/eomUjrfgnVLMWkJhX9UGs0ZnYMja02Si','CANDIDATE','ACTIVE'),('4013e0cb-245e-49ae-b432-2a7500736640','2024-05-12 10:45:44.576168','2024-05-19 18:21:02.775466','candidate3@gmail.com','$2a$10$5S136nxzwMNcmaXq4wJ6z.d/.W121coFxxxEakEKscyjENL7C/O0q','CANDIDATE','ACTIVE'),('46456c1b-7d34-4f55-98c7-09616da21b37','2024-05-12 16:42:43.135006','2024-05-12 16:42:43.135006','employer12@gmail.com','$2a$10$WFJcmyHZV6rWsQR8Hs8cT.q0fU9U5qnbFCOh9d.rxfP3ouFY2A3JG','EMPLOYER','PENDING'),('52ccc54d-c5e3-4d46-9543-1632ce60afdf','2024-05-12 16:32:07.303322','2024-05-12 16:44:08.292563','employer8@gmail.com','$2a$10$zDQEtHuSHn30AQ1gBMF9nObcDRMB5OxksvX6rIg0BNCRcURcgaTW6','EMPLOYER','ACTIVE'),('536da641-c6c0-4d4f-b26c-eebbb6535976','2024-05-12 16:30:37.531520','2024-05-12 16:43:56.874723','employer7@gmail.com','$2a$10$vwW.66OJ0qP0B7exgVrJM.mdquiNmEXEcruW76eGRy72kKfwt3Kgi','EMPLOYER','ACTIVE'),('5eaec381-56c7-4b4c-9709-d3ba3dd34292','2024-05-12 17:54:45.453020','2024-05-12 17:54:45.453020','nhansu1@gamil.com','$2a$10$0WAL72ewbtew74kwR.RRKOmhlv5LQxF7d.z52IXdTi45xX4g8Rzou','HR','ACTIVE'),('65699a8c-4074-445c-a4a7-c0d580c10f8a','2024-05-12 16:39:06.958633','2024-05-12 16:43:58.904796','employer11@gmail.com','$2a$10$fW9nREkpjAnA7rEDLjA1uuTqmYVKhR9IPw.SK98BIcNbnSdUavmgi','EMPLOYER','ACTIVE'),('6f845269-a21a-473e-bfbc-935745242e4b','2024-06-16 14:17:14.605683','2024-06-16 14:17:14.605683','chatbox3202@gmail.com','$2a$10$MhUeKusFf.FNmuvoTkQhl.cqIsGN0V7JghSNnyIBKhjtI9YTCtMNm','CANDIDATE','ACTIVE'),('74782b00-9f76-41fc-b94b-fbf7fb802aee','2024-06-19 23:16:06.169172','2024-06-19 23:16:06.169172','canminh0298@gmail.com','$2a$10$Cng5ZkCU7vV7R8MBRADEm.TBB6gwnVgFYyZVIfN9pmjFY5VdDpyJi','CANDIDATE','ACTIVE'),('776138ab-4c2c-4c7e-9e79-7d8281a2ad1e','2024-05-12 11:57:52.146072','2024-06-17 19:46:08.424093','2051052048hoang@ou.edu.vn','$2a$10$9tZrk7AWq2RX2OE4mg.NZ.Cu16BeNF5l.b8IGE2sFuyYyG4Er8t16','EMPLOYER','ACTIVE'),('7b1b594e-c278-4e5c-861b-147d2f9c4d39','2024-05-13 17:35:07.003455','2024-05-13 17:35:07.003455','human1@gmail.com','$2a$10$Wspq0lcbYjkfafEZIFts8uilPo8mx57BaVGn10Z3cRuihg.09z3se','HR','ACTIVE'),('8c8c69b3-87e1-4170-bc1e-6bbe0c27d3c8','2024-05-12 17:46:16.336042','2024-05-12 17:46:16.336042','hr1@gmail.com','$2a$10$s1naa.fi6z6u5EKaxCvIhep7r1C9u7QjKJPwX6nW9M93KZ3qgJT6m','HR','ACTIVE'),('8ce3cc04-72c5-466d-bc98-6cdeb3da3714','2024-05-12 17:49:11.887384','2024-05-12 17:49:11.887384','hr3@gmail.com','$2a$10$2RK1mhiwl3GrLQ/BFcrQ.OOvspFx5HK4x85GHCqweuTyUofbA124.','HR','ACTIVE'),('911ee4f6-f2ef-4edc-8d29-a62d98fcd36d','2024-05-12 17:55:40.150301','2024-05-12 17:55:40.150301','nhansu2@gmail.com','$2a$10$AV0A.nxq8/2VKqpQHiDM7u2xFaXVB47K/sFwpMkP93MX6aSMx39qC','HR','ACTIVE'),('9a750c5d-2b69-406d-93e4-1f83ade25c4d','2024-05-12 16:33:12.887124','2024-05-12 16:44:05.055037','employer9@gmail.com','$2a$10$cYBMn.8WWqe6bU40UgDjbOHA6Wv291KXcuJrd23.TkACvwEU0A3C2','EMPLOYER','ACTIVE'),('9eb50613-4bd0-4500-b373-27800c10189a','2024-05-12 11:58:55.253887','2024-05-12 15:28:55.683979','employer2@gmail.com','$2a$10$09ePrK8SkVp2.BSRdgmxOeeDfjuTCiQgwUpdutIVW6eDnF09WcHgS','EMPLOYER','ACTIVE'),('ad5c2fa0-6239-437c-bece-09535a371be8','2024-05-12 16:26:11.616725','2024-05-16 22:35:30.706907','employer4@gmail.com','$2a$10$u2XI9muy01K7suChqg5YTeSTog7iLjpE8idqVMGlvMRu0jg1N03X6','EMPLOYER','ACTIVE'),('c74af638-4945-4899-b217-5ecdfb8ba83b','2024-05-12 16:28:09.478095','2024-05-12 16:43:53.875001','employer5@gmail.com','$2a$10$itkNll1ykNyIKUm3Loztc.CMlb3sXh3A8NQzmAbPoFtrUBhhew3rK','EMPLOYER','PENDING'),('ca7aa652-b0f9-4218-8be2-6909bff0a5d2','2024-05-12 12:00:00.230509','2024-05-12 15:28:57.968879','employer3@gmail.com','$2a$10$o81ERK41cWEMjXVlplg.iOt/uY230/fn23kb1S8qOlBgWkl6h1t9.','EMPLOYER','ACTIVE'),('d0efdb6e-30bd-46d5-b7ab-3757c28500bc','2024-05-12 09:37:49.282110','2024-06-17 17:38:18.813708','admin@gmail.com','$2a$10$L1jCQoyHXjf9iaA9pOIaneI//6cLkm2YXjdjf95n5B9wbzebY3sSi','ADMIN','ACTIVE'),('f0058242-8b77-4411-bb77-0208ddfed26f','2024-05-12 10:46:32.830698','2024-05-12 10:46:32.830698','candidate2@gmail.com','$2a$10$L1jCQoyHXjf9iaA9pOIaneI//6cLkm2YXjdjf95n5B9wbzebY3sSi','CANDIDATE','ACTIVE');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vip`
--

DROP TABLE IF EXISTS `vip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vip` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `month` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` bigint NOT NULL,
  `status` enum('ACTIVE','INACTIVE','DELETED') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_88t0pi44jeiixt67owhb5vjcn` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vip`
--

LOCK TABLES `vip` WRITE;
/*!40000 ALTER TABLE `vip` DISABLE KEYS */;
INSERT INTO `vip` VALUES ('291a30ac-9fb8-4cda-b7ea-e063d431d196','2024-05-12 10:34:56.706195','2024-06-07 16:00:32.977789','#ff7a00','- Hiển thị trong mục nhà tuyển dụng nổi bật.\n- Hiển thị trong mục công việc nổi bật.\n- Xuất hiện nổi bật với khung VIP bôi cam đậm thu hút ứng viên.\n- Thêm chức năng tìm kiếm ứng viên.',12,'GÓI TIN VIP III',700000,'ACTIVE'),('5c1d76f6-8d76-4458-9a65-3089231de152','2024-05-14 11:15:25.293100','2024-05-14 11:15:41.174251','#00a3ff','Dịch vụ dùng thử',1,'DICHVU4',0,'DELETED'),('a8fffb39-a4b9-4efd-a13e-6db467f9c66c','2024-06-07 16:00:02.221008','2024-06-07 16:00:11.088432','#aabbcc','- Hiển thị trong mục nhà tuyển dụng nổi bật.\n- Hiển thị trong mục công việc nổi bật.\n- Xuất hiện nổi bật với khung VIP bôi cam đậm thu hút ứng viên.\n- Thêm chức năng tìm kiếm ứng viên.',1,'GÓI TIN TRIAL',0,'INACTIVE'),('c3523ec6-7413-4024-9722-9364862b6f7c','2024-05-13 10:33:08.908522','2024-06-07 16:00:29.290079','#8700ff','- Hiển thị trong mục nhà tuyển dụng nổi bật.\n- Hiển thị trong mục công việc nổi bật.\n- Xuất hiện nổi bật với khung VIP bôi cam đậm thu hút ứng viên.\n- Thêm chức năng tìm kiếm ứng viên.',6,'GÓI TIN VIP II',500000,'ACTIVE'),('dd889823-df5e-4636-a081-96b38456dda4','2024-05-14 10:32:09.838772','2024-06-07 16:00:25.464081','#1b7ee1','- Hiển thị trong mục nhà tuyển dụng nổi bật.\n- Hiển thị trong mục công việc nổi bật.\n- Xuất hiện nổi bật với khung VIP bôi cam đậm thu hút ứng viên.\n- Thêm chức năng tìm kiếm ứng viên.',3,'GÓI TIN VIP I',300000,'ACTIVE');
/*!40000 ALTER TABLE `vip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vip_employer`
--

DROP TABLE IF EXISTS `vip_employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vip_employer` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_date` datetime(6) NOT NULL,
  `price` bigint NOT NULL,
  `to_date` datetime(6) NOT NULL,
  `employer_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vip_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` datetime(6) NOT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `invoice_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2i9gi7x7sq4lefbbw9vkdcfj` (`employer_id`),
  KEY `FKh9y04llt3os672mrmdplvtpif` (`vip_id`),
  CONSTRAINT `FK2i9gi7x7sq4lefbbw9vkdcfj` FOREIGN KEY (`employer_id`) REFERENCES `employer` (`id`),
  CONSTRAINT `FKh9y04llt3os672mrmdplvtpif` FOREIGN KEY (`vip_id`) REFERENCES `vip` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vip_employer`
--

LOCK TABLES `vip_employer` WRITE;
/*!40000 ALTER TABLE `vip_employer` DISABLE KEYS */;
INSERT INTO `vip_employer` VALUES ('1198ff35-166c-455a-8615-c7fbde62ec6a','2025-05-14 22:24:56.696803',300000,'2025-08-14 22:24:56.696803','d4b4525c-c2b4-499a-aa50-491fba2ab238','dd889823-df5e-4636-a081-96b38456dda4','2024-04-14 22:50:19.291853','2024-05-14 22:50:19.291853','14414803'),('4a61171b-8716-43e0-bc1a-1c05eb71a49f','2024-06-05 10:32:25.318765',500000,'2024-12-05 10:32:25.318765','a809e019-b0c1-4fcf-87a8-9f241dc93973','c3523ec6-7413-4024-9722-9364862b6f7c','2024-06-05 10:32:25.326279','2024-06-05 10:32:25.326279','14444269'),('4e5a2cec-1839-484a-b8aa-f72bcbcbcda1','2024-05-14 22:24:56.696803',700000,'2025-05-14 22:24:56.696803','d4b4525c-c2b4-499a-aa50-491fba2ab238','291a30ac-9fb8-4cda-b7ea-e063d431d196','2024-05-14 22:24:56.700295','2024-05-14 22:24:56.700295','14414769'),('849b0a9c-11c4-4ea8-8ff7-7296373960a1','2024-05-15 13:17:15.592647',300000,'2024-08-15 13:17:15.592647','9e6fed88-82a4-43d6-965b-8fbe74234343','dd889823-df5e-4636-a081-96b38456dda4','2024-05-15 13:17:15.616648','2024-05-15 13:17:15.616648','14415414'),('92fe7606-32f9-42ed-a8bf-007b23dc10d6','2024-06-05 09:11:06.292602',500000,'2024-12-05 09:11:06.292602','1833f87c-b209-4091-aee0-a3bf692fbf75','c3523ec6-7413-4024-9722-9364862b6f7c','2024-06-05 09:11:06.295604','2024-06-05 09:11:06.295604','14444148'),('d716213d-9d65-4372-a2cd-8e32e3ff4332','2024-06-05 09:13:05.663386',700000,'2025-06-05 09:13:05.663386','03b67a0f-6c28-451e-886f-04513794a292','291a30ac-9fb8-4cda-b7ea-e063d431d196','2024-06-05 09:13:05.663386','2024-06-05 09:13:05.663386','14444153');
/*!40000 ALTER TABLE `vip_employer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21  0:16:07
