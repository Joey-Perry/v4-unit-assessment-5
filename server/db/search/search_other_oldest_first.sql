SELECT p.id AS post_id,
title, content, img, profile_pic, date_created, username AS author_username
FROM helo_posts p JOIN helo_users u ON p.author_id = u.id
WHERE lower(title) NOT $1
ORDER BY date_created ASC;