<?php
	// require codebird
	require_once('codebird.php');
	 
	\Codebird\Codebird::setConsumerKey("LH5yXnDJzvRhyKQ14sFpgA", "S9yntPQuQENIsB0NtjPXxnxDoxIxnwxkLMsNBHv5M");
	$cb = \Codebird\Codebird::getInstance();
	$cb->setToken("92164961-6tG6ZAcEGJKy73hO9Zynbt46s86QpxFWCp135uemr", "UG2sFM6kcOCvjnFWkcDZYtGN1Rwf8dQDkvhmPovH3vLN9");
	 
	$message = 'Auto-Posted item on Twitter - http://www.twitter.com';
	echo $message;
	$params = array(
	  'status' => $message
	);
	$reply = $cb->statuses_update($params);

?>
