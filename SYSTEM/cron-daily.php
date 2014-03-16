<?php
// Returned response to SFDC and to stop resend
$date = new DateTime();
$timestamp = $date->format('Y-m-d H:i:s (U)');
$currentYear = $date->format('Y');
$currentMonth = $date->format('m');
$currentDay = $date->format('d');
$pastDay = intval($currentDay)-1;

$outputVal = "Daily prayer total reset: ";
$outputVal .= $timestamp;
echo $outputVal;


// Debug Data Stream
$outputFile = fopen ( "capturedData-cron-daily.txt", "a" );
fwrite ( $outputFile, $outputVal . PHP_EOL );
fclose ( $outputFile );

// Parse XML
require_once 'firebaseLib.php';
$url = 'https://ofl.firebaseio.com/';
$token = 'wWHtRZLdybxVBALNg6VP6gOzUSibWeYFVVrOIlC0';
$fb = new fireBase ( $url, $token );
$pathDailyTotal = '/app/text/dailyPrayerTotal';
$pathDailyTotalCurrent = $pathDailyTotal.'/total';
$pathDailyTotalByYear = $pathDailyTotal.'/'.$currentYear.'/total';
$pathDailyTotalByMonth = $pathDailyTotal.'/'.$currentYear.'/'.$currentMonth.'/total';
$pathDailyTotalByDay = $pathDailyTotal.'/'.$currentYear.'/'.$currentMonth.'/'.$currentDay;
$pathDailyTotalPastDay = $pathDailyTotal.'/'.$currentYear.'/'.$currentMonth.'/'.$pastDay;

$dailyTotalCurrent = intval($fb->get ( $pathDailyTotalCurrent ) );
$dailyTotalCurrentByYear = intval($fb->get ( $pathDailyTotalByYear ) );
$dailyTotalCurrentByMonth = intval($fb->get ( $pathDailyTotalByMonth ) );



$dailyTotalCurrentNew = 0;
$dailyTotalCurrentByYearNew = $dailyTotalCurrentByYear + $dailyTotalCurrent;
$dailyTotalCurrentByMonthNew = $dailyTotalCurrentByMonth + $dailyTotalCurrent;

$fb->set ( $pathDailyTotalCurrent,  $dailyTotalCurrentNew);
$fb->set ( $pathDailyTotalByYear,  $dailyTotalCurrentByYearNew);
$fb->set ( $pathDailyTotalByMonth,  $dailyTotalCurrentByMonthNew);
$fb->set ( $pathDailyTotalPastDay,  $dailyTotalCurrent);

/*
$prayerTotal = 0;
$response = $fb->set ( $todoPath, $prayerTotal );
$currentVal = $fb->get ( $todoPath );
echo "currentVal: ".$currentVal;
*/

?>

