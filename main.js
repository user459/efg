Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
prediction1="";
prediction2="";
camera=document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
});
}
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IKrZfr-fS/model.json",model_loaded);
function model_loaded(){
console.log("success");
}
function speak(){
var synth=window.speechSynthesis;
    speak_data_1="first prediction="+prediction1;
     speak_data_2="second prediction="+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2); 
    synth.speak(utterThis);
}
function check(){
img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
if(error){
console.error(error);
}
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label=="happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }
    }
}