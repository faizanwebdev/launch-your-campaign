<?php
//include "config.php";
date_default_timezone_set("Asia/Calcutta");
$date = date("Y-m-d");
$datetime = date("Y-m-d H:i:s");

function cleanup( $data ) {
//    global $con;
    $data = trim( $data );
    $data = htmlspecialchars( $data );
//    $data = mysqli_real_escape_string($con, $data);
    return $data;
}

if(isset($_POST['signup']) && $_SERVER['REQUEST_METHOD'] == "POST"){
    $name = cleanup($_POST['name']);
    $email = cleanup($_POST['email']);
    $contact = cleanup($_POST['contact']);
    $message = cleanup($_POST['message']);
    $website = cleanup($_POST['website']);
    $keywords = array("gmail","GMAIL","yahoo","YAHOO","outlook","OUTLOOK","rediff","REDIFF","hotmail","HOTMAIL");
    $keywords = implode("|",$keywords);
    if(empty($website)){
        $website = "NA";
    }
    $contactlen = strlen($contact);
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        echo "validemail";
        die();
    }
    if(preg_match_all("[$keywords]i", $email)){
	echo "validemail";
	die();
    }
    if($contactlen !== 10){
        echo "validnumber";
        die();
        }
    if(empty($name) || empty($email) || empty($contact) || empty($message)){
        echo "mandatory";
    }
    else{
            require_once 'PHPMailer-master/PHPMailerAutoload.php';
            $mail = new PHPMailer; 
            $mail->isSMTP();           
            $mail->Host = 'smtp.gmail.com';   
            $mail->SMTPAuth = true;     
            $mail->Username = 'faizan.kazi@enlyft.in';        
            $mail->Password = '';    
            $mail->SMTPSecure = 'tls';   
            $mail->Port = 587;
            $mail->setFrom('faizan.kazi@enlyft.in', 'ENLYFT');
	    $mail->addAddress('sarthak.gupta@enlyft.in', 'User 1');
	    $mail->addAddress('bd@enlyft.in','User 2');
            //$mail->addCC('ketan.parab@enlyft.in', 'User 3'); 

            $mail->isHTML(true);
            $mail->Subject = "ENLYFT Lead Generation Form ".$datetime." ";
            $mail->Body    = "<table width='500' border='0' align='center' cellpadding='0' cellspacing='0' style='font-family:Arial, Helvetica, sans-serif; font-size:12px; border:solid 1px #eaeaea;'>
                <tr>
                    <td width='25%' height='25' align='left' valign='top'>Name :</td>
                    <td width='75%' height='25' align='left' valign='top'>$name</td>
                </tr>
                <tr>
                    <td width='25%' height='25' align='left' valign='top'>Email:</td>
                    <td width='75%' height='25' align='left' valign='top'>$email</td>
                </tr>
                  <tr><td width='25%' height='25' align='left' valign='top'>Subject :</td>
                  <td width='75%' height='25' align='left' valign='top'>$contact</td>
                </tr>
                <tr>
                    <td width='25%' height='25' align='left' valign='top'>Website :</td>
                    <td width='75%' height='25' align='left' valign='top'>$website</td>
                </tr>
                <tr>
                    <td width='25%' height='25' align='left' valign='top'>Message :</td>
                    <td width='75%' height='25' align='left' valign='top'>$message</td>
                </tr>

                </table></td>
                </tr>
            </table><br>";
        if(!$mail->send()){
            echo "fail";
        }
        else{
            echo "success";
        }
    }
}
?>
