<?php

if(isset($_POST['conf']) && isset($_POST['data'])){
    save_conf($_POST['conf'], $_POST['data']);
}

function save_conf($conf, $data){
    $handle = fopen($conf, "w");
    if($handle){
        fwrite($handle, $data);
        fclose($handle);
        echo "File succesfully writen.";
    } else {
        echo "Cant open file.";
    }
}

?>