<?php
header('Content-Type: text/html; charset=utf-8');
    // $mes = date('M');
    // $dia = date('d');
    // $ano = date('Y');
    
    // $semana = array(
    //     'Sun' => 'Domingo', 
    //     'Mon' => 'Segunda-Feira',
    //     'Tue' => 'Terca-Feira',
    //     'Wed' => 'Quarta-Feira',
    //     'Thu' => 'Quinta-Feira',
    //     'Fri' => 'Sexta-Feira',
    //     'Sat' => 'Sábado'
    // );
    
    // $mes_extenso = array(
    //     'Jan' => 'Janeiro',
    //     'Feb' => 'Fevereiro',
    //     'Mar' => 'Marco',
    //     'Apr' => 'Abril',
    //     'May' => 'Maio',
    //     'Jun' => 'Junho',
    //     'Jul' => 'Julho',
    //     'Aug' => 'Agosto',
    //     'Nov' => 'Novembro',
    //     'Sep' => 'Setembro',
    //     'Oct' => 'Outubro',
    //     'Dec' => 'Dezembro'
    // );
    // echo "$data";
    // echo $semana["$data"] . ", {$dia} de " . $mes_extenso["$mes"] . " de {$ano}";

date_default_timezone_set('America/Sao_Paulo');

define ("FORM_ORIGEM_PARCEIRO","seja-um-parceiro");
define ("FORM_ORIGEM_FALE_CONOSCO","fale-conosco");

$submit = true;
$form_field = array();
$nome = "";
$email = "";
$funcao = "";
$origem = "";
$duvida = "";



if (isset($_POST["origem"]) && !empty($_POST["origem"])) { 
	$origem = $_POST["origem"];
} else {
	 $submit = false; 
	 $form_field["origem"] = 'origem';
} 


if (isset($_POST["nome"]) && !empty($_POST["nome"])) { 
	$nome = $_POST["nome"];
} else {
	 $submit = false; 
	 $form_field["nome"] = 'preencher o campo nome';
}

if (isset($_POST["email"]) && !empty($_POST["email"])) { 
	$email = $_POST["email"];
} else {
	 $submit = false; 
	 $form_field["email"] = 'preencher o campo email';
}


if ($origem == "formulario-fale-conosco") {
	 if (isset($_POST["duvida"]) && !empty($_POST["duvida"])) { 
	 	$duvida = $_POST["duvida"];
	} else {
		 $submit = false; 
		 $form_field["duvida"] = 'preencher o campo dúvida';
	}
} else {
	if (isset($_POST["funcao"]) && !empty($_POST["funcao"])) { 
		$funcao = $_POST["funcao"];
	} else {
		 $submit = false; 
		 $form_field["funcao"] = 'preencher o campo funcao';
	}
} 

if ($submit) {

	$link = mysql_connect('localhost', 'legaltdr_web', 'P;h77.sWZw71');
	if (!$link) {
		die('Não foi possível conectar: ' . mysql_error());
	}
	
	$rv = mysql_select_db("legaltdr_legalhome_landingpage_v1", $link);

	mysql_query("SET NAMES 'utf8'");
	mysql_query('SET character_set_connection=utf8');
	mysql_query('SET character_set_client=utf8');
	mysql_query('SET character_set_results=utf8');

	//$sql = "SET time_zone = '+3:00'"; 
	$sql  = "INSERT INTO contatos (nome,email,mensagem,origem,funcao) VALUES ('$nome','$email','$duvida','$origem','$funcao')";
	//echo $sql;
	$result = mysql_query($sql, $link);

	

	$sql  = "SELECT id FROM contatos ORDER BY id DESC LIMIT 1";
	$result = mysql_query($sql, $link);
	$row = mysql_fetch_assoc($result);
	
	$id_contato = "";
	if (!empty($row)) {
		$id_contato = $row["id"];
	}
	
	if ($origem == "formulario-fale-conosco") {
		$to = "contato@legalhome.com.br";	
		$headers = 'From: contato@legalhome.com.br' . "\r\n" .
	    'Reply-To: ' . $email . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();	
		$headers .= 'MIME-Version: 1.0' . "\r\n";
		//$headers .= 'Bcc:send2paulo@gmail.com' . "\r\n";
		//$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$subject = "Legal Home - Fale Conosco - " . $nome;
		$msg_body = file_get_contents("emails-sistemicos/faleconosco/index.html", "r");
		$msg_body = str_replace("[[[NOME]]]", $nome, $msg_body);
		$msg_body = str_replace("[[[EMAIL]]]", $email, $msg_body);
		$msg_body = str_replace("[[[MENSAGEM]]]", $duvida,  $msg_body);


	} else {

		$to = $email;	
		
		$headers = 'From: Legal Home <contato@legalhome.com.br>' . "\r\n" .
	    'Reply-To: contato@legalhome.com.br' . "\r\n" .
	    'X-Mailer: PHP/' . phpversion();	
		$headers .= 'MIME-Version: 1.0' . "\r\n";
		//$headers .= 'Bcc:send2paulo@gmail.com' . "\r\n";
		//$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$subject = "Legal Home - Faça o download da cartilha sobre a nova lei dos domésticos";
		$msg_body = file_get_contents("emails-sistemicos/download-cartilha/index.html", "r");
		$msg_body = str_replace("[[[NOME]]]", $nome, $msg_body);
		$msg_body = str_replace("[[[EMAIL]]]", $email, $msg_body);
		$mensagem = "Baixe aqui seu PDF";
		$msg_body = str_replace("[[[MENSAGEM]]]", $mensagem,  $msg_body);

		//echo $msg_body;
	}

	$disparado_para = $headers . " To:" . $to;
    $http_referer = "";
	if (isset($_SERVER['HTTP_REFERER']) and !empty($_SERVER['HTTP_REFERER'])) {
		$http_referer = $_SERVER['HTTP_REFERER'];
	}

	$php_self = "";
	if (isset($_SERVER['PHP_SELF']) and !empty($_SERVER['PHP_SELF'])) {
		$php_self = $_SERVER['PHP_SELF'];
	}

	//dispara o email
	$sended = mail ($to, $subject, $msg_body, $headers);
	
	//Registra o log
	$sql  = "INSERT INTO contatos_log (id_contato,status_envio_email,disparado_para,http_referer,php_self,origem) VALUES ($id_contato,'$sended','$disparado_para','$http_referer','$php_self','$origem')";
	// echo $sql;
	$result = mysql_query($sql, $link);	

	mysql_close($link);

	if ($sended) {
		echo("1");
	} else {
		echo("2");
		//die();
	}
} else {
   echo("2");
}
?>