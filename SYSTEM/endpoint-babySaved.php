<?php
// Returned response to SFDC and to stop resend
function respond($returnedMsg) {
	print '<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/X$
         <soapenv:Body>
         <notifications xmlns="http://soap.sforce.com/2005/09/outbound">
         <Ack>' . $returnedMsg . '</Ack>
         </notifications>
         </soapenv:Body>
         </soapenv:Envelope>';
}

header ( "Content-Type: text/xml\r\n" );
ob_start ();

$capturedData = fopen ( 'php://input', 'rb' );
$content = fread ( $capturedData, 5000 );

$date = new DateTime();
$timestampString = $date->format('Y-m-d H:i:s');
$timestampMS = $date->format('U');


// Parse XML
$rcXML = simplexml_load_string ( $content );

$lifeNumber = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )-> OFL_Life_Decision_Number__c;

$eventId = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )->Id;
$prcId = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )->PRC__c;

$cityName = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )->App_PRC_Impact_City__c;
$cityOriginal = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )->App_PRC_Impact_City__c;
$stateCode = $rcXML->children ( 'http://schemas.xmlsoap.org/soap/envelope/' )->Body->children ( 'http://soap.sforce.com/2005/09/outbound' )->notifications->Notification->sObject->children ( 'urn:sobject.enterprise.soap.sforce.com' )->App_PRC_Impact_State__c;

$us_state_abbrevs_names = array (
		'AL' => 'ALABAMA',
		'AK' => 'ALASKA',
		'AS' => 'AMERICAN SAMOA',
		'AZ' => 'ARIZONA',
		'AR' => 'ARKANSAS',
		'CA' => 'CALIFORNIA',
		'CO' => 'COLORADO',
		'CT' => 'CONNECTICUT',
		'DE' => 'DELAWARE',
		'DC' => 'DISTRICT OF COLUMBIA',
		'FM' => 'FEDERATED STATES OF MICRONESIA',
		'FL' => 'FLORIDA',
		'GA' => 'GEORGIA',
		'GU' => 'GUAM GU',
		'HI' => 'HAWAII',
		'ID' => 'IDAHO',
		'IL' => 'ILLINOIS',
		'IN' => 'INDIANA',
		'IA' => 'IOWA',
		'KS' => 'KANSAS',
		'KY' => 'KENTUCKY',
		'LA' => 'LOUISIANA',
		'ME' => 'MAINE',
		'MH' => 'MARSHALL ISLANDS',
		'MD' => 'MARYLAND',
		'MA' => 'MASSACHUSETTS',
		'MI' => 'MICHIGAN',
		'MN' => 'MINNESOTA',
		'MS' => 'MISSISSIPPI',
		'MO' => 'MISSOURI',
		'MT' => 'MONTANA',
		'NE' => 'NEBRASKA',
		'NV' => 'NEVADA',
		'NH' => 'NEW HAMPSHIRE',
		'NJ' => 'NEW JERSEY',
		'NM' => 'NEW MEXICO',
		'NY' => 'NEW YORK',
		'NC' => 'NORTH CAROLINA',
		'ND' => 'NORTH DAKOTA',
		'MP' => 'NORTHERN MARIANA ISLANDS',
		'OH' => 'OHIO',
		'OK' => 'OKLAHOMA',
		'OR' => 'OREGON',
		'PW' => 'PALAU',
		'PA' => 'PENNSYLVANIA',
		'PR' => 'PUERTO RICO',
		'RI' => 'RHODE ISLAND',
		'SC' => 'SOUTH CAROLINA',
		'SD' => 'SOUTH DAKOTA',
		'TN' => 'TENNESSEE',
		'TX' => 'TEXAS',
		'UT' => 'UTAH',
		'VT' => 'VERMONT',
		'VI' => 'VIRGIN ISLANDS',
		'VA' => 'VIRGINIA',
		'WA' => 'WASHINGTON',
		'WV' => 'WEST VIRGINIA',
		'WI' => 'WISCONSIN',
		'WY' => 'WYOMING',
		'WI' => 'WISCONSIN',
		'WY' => 'WYOMING',
		'AE' => 'ARMED FORCES AFRICA \ CANADA \ EUROPE \ MIDDLE EAST',
		'AA' => 'ARMED FORCES AMERICA (EXCEPT CANADA)',
		'AP' => 'ARMED FORCES PACIFIC' 
);

$us_state_abbrevs_names_proper = array (
	'AL' => 'Alabama',
	'AK' => 'Alaska',
	'AS' => 'American Samoa',
	'AZ' => 'Arizona',
	'AR' => 'Arkansas',
	'CA' => 'California',
	'CO' => 'Colorado',
	'CT' => 'Connecticut',
	'DE' => 'Delaware',
	'DC' => 'District of Columbia',
	'FM' => 'Federated States of Micronesia',
	'FL' => 'Florida',
	'GA' => 'Georgia',
	'GU' => 'Guam Gu',
	'HI' => 'Hawaii',
	'ID' => 'Idaho',
	'IL' => 'Illinois',
	'IN' => 'Indiana',
	'IA' => 'Iowa',
	'KS' => 'Kansas',
	'KY' => 'Kentucky',
	'LA' => 'Louisiana',
	'ME' => 'Maine',
	'MH' => 'Marshall Islands',
	'MD' => 'Maryland',
	'MA' => 'Massachusetts',
	'MI' => 'Michigan',
	'MN' => 'Minnesota',
	'MS' => 'Mississippi',
	'MO' => 'Missouri',
	'MT' => 'Montana',
	'NE' => 'Nebraska',
	'NV' => 'Nevada',
	'NH' => 'New Hampshire',
	'NJ' => 'New Jersey',
	'NM' => 'New Mexico',
	'NY' => 'New York',
	'NC' => 'North Carolina',
	'ND' => 'North Dakota',
	'MP' => 'Northern Mariana Islands',
	'OH' => 'Ohio',
	'OK' => 'Oklahoma',
	'OR' => 'Oregon',
	'PW' => 'Palau',
	'PA' => 'Pennsylvania',
	'PR' => 'Puerto Rico',
	'RI' => 'Rhode Island',
	'SC' => 'South Carolina',
	'SD' => 'South Dakota',
	'TN' => 'Tennessee',
	'TX' => 'Texas',
	'UT' => 'Utah',
	'VT' => 'Vermont',
	'VI' => 'Virgin Islands',
	'VA' => 'Virginia',
	'WA' => 'Washington',
	'WV' => 'West Virginia',
	'WI' => 'Wisconsin',
	'WY' => 'Wyoming',
	'WI' => 'Wisconsin',
	'WY' => 'Wyoming',
	'AE' => 'Armed Forces Africa \ Canada \ Europe \ Middle East',
	'AA' => 'Armed Forces America (Except Canada)',
	'AP' => 'Armed Forces Pacific'
);


		
$lifeNumber = intval($lifeNumber);
$eventId = strval($eventId);
$prcId = strval($prcId);
$cityName = strval($cityName);
$stateCode = strval($stateCode);

$stateName = $us_state_abbrevs_names [$stateCode];
$stateName = strval($stateName);
$stateNameProper = $us_state_abbrevs_names_proper [$stateCode];
$stateNameProper = strval($stateNameProper);


$one = array (
	'Id' => $eventId,
	'OFL_Life_Decision_Number' => $lifeNumber,
	'PRC_Id' => $prcId,
	'City' => $cityName,
	'StateCode' => $stateCode,
	'StateName' => $stateName,
	'Timestamp' => $timestampString,
	'TimestampMS' => $timestampMS
);

require_once 'firebaseLib.php';
$url = 'https://ofl.firebaseio.com/';
$token = 'wWHtRZLdybxVBALNg6VP6gOzUSibWeYFVVrOIlC0';
$fb = new fireBase ( $url, $token );
$todoPath = '/app/text/counts/totalBabiesSaved/'.$eventId;
$todoPathTotal = '/app/text/counts/totalBabiesSaved/total';

$totalBabiesSavedCurrent = intval($fb->get ( $todoPathTotal ) );





// Debug Data Stream
$debugText = "totalBabiesSavedCurrent: ".$totalBabiesSavedCurrent;
$debugText .= "\n";
$debugText .= "gettype(lifeNumber): ".gettype($lifeNumber);
$debugText .= "\n";
$debugText .= "gettype(totalBabiesSavedCurrent): ".gettype($totalBabiesSavedCurrent);
$debugText .= "\n";
$debugText .= "cityOriginal: ".$cityOriginal;
$debugText .= "\n";
$debugText .= "cityName: ".$cityName;
$debugText .= "\n";
$debugText .= "stateCode: ".$stateCode;
$debugText .= "\n";
$debugText .= "stateNameOriginal: ".$us_state_abbrevs_names[$stateCode];
$debugText .= "\n";
$debugText .= "StateName: ".$stateName;
$debugText .= "\n";
if($lifeNumber <= $totalBabiesSavedCurrent){
	$debugText .= "lifeNumber is not greater than current number";
	$debugText .= "\n";
}
$debugText .= "lifeNumber: ".intval($lifeNumber);
$debugText .= "\n";
$debugText .= $content;
$debugText .= "\n";


$fb->set ( $todoPath, $one );

	// require codebird
	require_once('codebird.php');
	
	$apiKey = "EL1BKtfVFP4Scg89tfrWw";
	$apiSecret = "Rch0sOh2aUqUQcdQ4u3xHCfv4asdYoiftXJkuhbM";
	$accessToken = "1666727516-cwtU8FIeOpzexCwIQg5n26r7xVwdt2cHW7xJUyB";
	$accessTokenSecret = "3IF5wMXI4T9sNKON8YzWZuKfwD7BPCrUsygftRiONMyZm";
	$tweetMessage = "Baby number $lifeNumber was just saved in $cityName, $stateNameProper";

	$twitterDev = false;
	if($twitterDev){
		$apiKey = "LH5yXnDJzvRhyKQ14sFpgA";
		$apiSecret = "S9yntPQuQENIsB0NtjPXxnxDoxIxnwxkLMsNBHv5M";
		$accessToken = "92164961-6tG6ZAcEGJKy73hO9Zynbt46s86QpxFWCp135uemr";
		$accessTokenSecret = "UG2sFM6kcOCvjnFWkcDZYtGN1Rwf8dQDkvhmPovH3vLN9";
		$tweetMessage = "Number $lifeNumber was in $cityName, $stateNameProper";
	}
	

	\Codebird\Codebird::setConsumerKey($apiKey, $apiSecret);
	$cb = \Codebird\Codebird::getInstance();
	$cb->setToken($accessToken,$accessTokenSecret);
	$params2 = array(
	  'status' => $tweetMessage
	);

	$debugText .= "twitterDev: $twitterDev\n";
	$debugText .= "tweetMessage: $tweetMessage\n";
	$debugText .= "$twitterDev\n";
	
	if($lifeNumber > $totalBabiesSavedCurrent){
		$fb->set ( $todoPathTotal, intval($lifeNumber) );
		$reply = $cb->statuses_update($params2);
	
		// Send to API
		//$tweetMessage
		if( ! file_get_contents( 'http://cpptl.co/apps/pushmaster/Ofl/lifechoice?api_key=rc1298731872189723ofl&ofl&number='.$lifeNumber.'&city='.$cityName.'&state=' . $stateNameProper ) ){
			$debugText .= "Failed to delivery Push\n";
		}
		else {
			$debugText .= "Push Delivered";
		}
	}
	
	
	$outputFile = fopen ( "capturedData-babySaved.txt", "a" );
	fwrite ( $outputFile, $debugText . PHP_EOL );
	fclose ( $outputFile );
?>
