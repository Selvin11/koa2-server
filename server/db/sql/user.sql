CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT, # 用户ID
  `password` varchar(255) DEFAULT NULL, # 密码
  `name` varchar(255) DEFAULT NULL,     # 用户名
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,   # 创建时间
  `token` varchar(255) DEFAULT NULL,   # token
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
