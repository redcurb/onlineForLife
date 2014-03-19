<?php
// Returned response to SFDC and to stop resend
function respond($returnedMsg) {
         print '<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
         <soapenv:Body>
         <notifications xmlns="http://soap.sforce.com/2005/09/outbound">
         <Ack>' . $returnedMsg . '</Ack>
         </notifications>
         </soapenv:Body>
         </soapenv:Envelope>';
}

header("Content-Type: text/xml\r\n");
ob_start();
 
$capturedData = fopen('php://input', 'rb');
$content = fread($capturedData,5000);

$rcXML = simplexml_load_string($content);

#die( $rcXML );

$one = array ( 
	'CreatedDate' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')
													->Body->children('http://soap.sforce.com/2005/09/outbound')->notifications->Notification
													->sObject->children('urn:sobject.enterprise.soap.sforce.com')->CreatedDate,
	'Appt_Date' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->Appt_Date__c,
	'Appt_Kept' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->Appt_Kept__c,
	'Appt_Made' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->Appt_Made__c,
	'Chose_Life' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->Chose_Life__c,
	'City' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->App_PRC_Impact_City__c,
	'Id' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->Id,
	'Initial_Contact_Date' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body
	->children('http://soap.sforce.com/2005/09/outbound')->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')
	->Initial_Contact_Date__c,
	'OFL_Life_Decision_Number' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body
	->children('http://soap.sforce.com/2005/09/outbound')->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')
	->OFL_Life_Decision_Number__c,
	'PRC_Id' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->PRC__c,
	'State' => $rcXML->children('http://schemas.xmlsoap.org/soap/envelope/')->Body->children('http://soap.sforce.com/2005/09/outbound')
	->notifications->Notification->sObject->children('urn:sobject.enterprise.soap.sforce.com')->App_PRC_Impact_State__c
);



require_once 'firebaseLib.php';
$url = 'https://ofl.firebaseio.com/';
$token = 'wWHtRZLdybxVBALNg6VP6gOzUSibWeYFVVrOIlC0';
$fb = new fireBase($url, $token);
$todoPath = '/feedData';
//$response = $fb->set($todoPath, $one);
$response = $fb->push($todoPath, $one);

#Some State Data
$us_state_abbrevs_names = array(
	'AL'=>'ALABAMA',
	'AK'=>'ALASKA',
	'AS'=>'AMERICAN SAMOA',
	'AZ'=>'ARIZONA',
	'AR'=>'ARKANSAS',
	'CA'=>'CALIFORNIA',
	'CO'=>'COLORADO',
	'CT'=>'CONNECTICUT',
	'DE'=>'DELAWARE',
	'DC'=>'DISTRICT OF COLUMBIA',
	'FM'=>'FEDERATED STATES OF MICRONESIA',
	'FL'=>'FLORIDA',
	'GA'=>'GEORGIA',
	'GU'=>'GUAM GU',
	'HI'=>'HAWAII',
	'ID'=>'IDAHO',
	'IL'=>'ILLINOIS',
	'IN'=>'INDIANA',
	'IA'=>'IOWA',
	'KS'=>'KANSAS',
	'KY'=>'KENTUCKY',
	'LA'=>'LOUISIANA',
	'ME'=>'MAINE',
	'MH'=>'MARSHALL ISLANDS',
	'MD'=>'MARYLAND',
	'MA'=>'MASSACHUSETTS',
	'MI'=>'MICHIGAN',
	'MN'=>'MINNESOTA',
	'MS'=>'MISSISSIPPI',
	'MO'=>'MISSOURI',
	'MT'=>'MONTANA',
	'NE'=>'NEBRASKA',
	'NV'=>'NEVADA',
	'NH'=>'NEW HAMPSHIRE',
	'NJ'=>'NEW JERSEY',
	'NM'=>'NEW MEXICO',
	'NY'=>'NEW YORK',
	'NC'=>'NORTH CAROLINA',
	'ND'=>'NORTH DAKOTA',
	'MP'=>'NORTHERN MARIANA ISLANDS',
	'OH'=>'OHIO',
	'OK'=>'OKLAHOMA',
	'OR'=>'OREGON',
	'PW'=>'PALAU',
	'PA'=>'PENNSYLVANIA',
	'PR'=>'PUERTO RICO',
	'RI'=>'RHODE ISLAND',
	'SC'=>'SOUTH CAROLINA',
	'SD'=>'SOUTH DAKOTA',
	'TN'=>'TENNESSEE',
	'TX'=>'TEXAS',
	'UT'=>'UTAH',
	'VT'=>'VERMONT',
	'VI'=>'VIRGIN ISLANDS',
	'VA'=>'VIRGINIA',
	'WA'=>'WASHINGTON',
	'WV'=>'WEST VIRGINIA',
	'WI'=>'WISCONSIN',
	'WY'=>'WYOMING',
	'AE'=>'ARMED FORCES AFRICA \ CANADA \ EUROPE \ MIDDLE EAST',
	'AA'=>'ARMED FORCES AMERICA (EXCEPT CANADA)',
	'AP'=>'ARMED FORCES PACIFIC'
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

// Debug Data Stream
$debugText = "";
$debugText .= "\n";
$debugText .= "PRC_Id: ".$one['PRC_Id'];
$debugText .= "\n";
$debugText .= "OFL_Life_Decision_Number: ".$one['OFL_Life_Decision_Number'];
$debugText .= "\n";



$currentSavedCountUrl = 'https://ofl.firebaseio.com/';
$currentSavedCountToken = 'wWHtRZLdybxVBALNg6VP6gOzUSibWeYFVVrOIlC0';
$currentSavedCountFb = new fireBase($currentSavedCountUrl, $currentSavedCountToken);
$currentSavedCountPath = '/app/text/counts/totalBabiesSaved/total';
$currentSavedCount = $currentSavedCountFb->get($currentSavedCountPath);
	
$debugText .= "currentSavedCountPath: ".$currentSavedCountPath;
$debugText .= "\n";
$debugText .= "currentSavedCount: ".$currentSavedCount;
$debugText .= "\n";


# Secondary Push
$step = '1';
if( $one['OFL_Life_Decision_Number'] > '' ){
	$step = '4';
	$url = 'https://ofl.firebaseio.com/';
	$token = 'wWHtRZLdybxVBALNg6VP6gOzUSibWeYFVVrOIlC0';
	$fb = new fireBase($url, $token);
	$todoPath = '/app/text/counts/totalBabiesSaved/total';
	$response = $fb->get($todoPath);
	#printf("Result: %s\n", $response);
	if( $response > $one["OFL_Life_Decision_Number"] ){
		$fb = new fireBase($url, $token);
		$todoPath = '/app/text/counts/totalBabiesSaved/total';
		$response = $fb->set($todoPath, $one["OFL_Life_Decision_Number"] );
	}
}

$cityName = $one['City'];
$state = $one['State'];
$stateName = $us_state_abbrevs_names["$state"];
$stateNameProper = $us_state_abbrevs_names_proper["$state"];

if( $one['Appt_Kept'] == 'Yes' ) $step = '3';
if( $one['Appt_Made'] == 'Referred' ) $step = '';
if( $one['Appt_Made'] == 'Yes' ) $step = '2';

#if( $step > '' )
#{

	// Send the data off
	$two = array(
		'state' => $one['State'],
		'step' => $step,
		'stateName' => $us_state_abbrevs_names["$state"],
		'city' => $one['City'],
		'lifeNumber' => $one['OFL_Life_Decision_Number'],
		'id' => $one['Id']
	); 

	// Fire off - https://ofl.firebaseio.com/feedJSON
	$fb = new fireBase($url, $token);
	$todoPath = '/feedJSON';
	//$response = $fb->set($todoPath, $one);
	$response = $fb->push($todoPath, $two);

	
	//twitter output
	if($step!='' && $step != '4'){
		require_once('codebird.php');
		$apiKey = "lSBqbCYivjVcVGF54Ah2tA";
		$apiSecret = "gUKopBziWPNPGUSapSEcxiP1nhTeyOJwQ5pvSKE";
		$accessToken = "1666727516-Rkhh7AYxX7FDb0jiilbKhTDf12ZRL3KwPg3m0qq";
		$accessTokenSecret = "IuUgnco9bXzmZ5EBXIBa3UQjsubxI32ubF95fen9gqwnA";
	
		if($step=='1'){
			$tweetMessage = "Someone considering abortion in $cityName, $stateNameProper just contacted a PRC";
		}
		elseif($step=='2'){
			$tweetMessage = "Someone considering abortion in $cityName, $stateNameProper just scheduled an appointment with a PRC";
		}
		elseif($step=='3'){
			$tweetMessage = "Someone considering abortion in $cityName, $stateNameProper kept her appointment at the PRC";
		}
			
		$twitterDev = true;
		if($twitterDev){
			$apiKey = "LH5yXnDJzvRhyKQ14sFpgA";
			$apiSecret = "S9yntPQuQENIsB0NtjPXxnxDoxIxnwxkLMsNBHv5M";
			$accessToken = "92164961-6tG6ZAcEGJKy73hO9Zynbt46s86QpxFWCp135uemr";
			$accessTokenSecret = "UG2sFM6kcOCvjnFWkcDZYtGN1Rwf8dQDkvhmPovH3vLN9";
			if($step=='1'){
				$tweetMessage = "Someone in $cityName, $stateNameProper just contacted a PRC";
			}
			elseif($step=='2'){
				$tweetMessage = "Someone in $cityName, $stateNameProper just scheduled an appointment with a PRC";
			}
			elseif($step=='3'){
				$tweetMessage = "Someone in $cityName, $stateNameProper kept her appointment at the PRC";
			}
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
	}
	else{
		$debugText .= "twitterDev: tweet not sent\n";
		$debugText .= "step: $step\n";
	}
	
#}

fclose($capturedData);


$debugText .= "CONTENT";
$debugText .= "\n";
$debugText .= $content;
$debugText .= "\n";

$outputFile = fopen("capturedData-feedData.txt", "a");
fwrite($outputFile, $debugText);
fclose($outputFile);

ob_end_clean();

respond('true');
?>
