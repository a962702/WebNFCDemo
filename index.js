document.getElementById('first2second').addEventListener('click', ()=>{
    document.getElementById('first_step').style.display = 'none';
    document.getElementById('second_step').style.display = 'block';
})

document.getElementById('second2third').addEventListener('click', async ()=>{
    document.getElementById('second_step').style.display = 'none';
    document.getElementById('third_step').style.display = 'block';
    // NFC
    try {
        const ndef = new NDEFReader();
        await ndef.scan();

        document.getElementById('third_step_status').innerHTML = "<i class='bi bi-phone-vibrate-fill' style='font-size: 95vw; color: black;'></i>請開啟手機NFC功能，並將卡片放置於NFC感應區";
    
        ndef.addEventListener("readingerror", () => {
            document.getElementById('third_step_status').innerHTML = "<i class='bi bi-patch-exclamation-fill' style='font-size: 95w; color: orange;'></i>讀取時發生錯誤，請移開卡片，然後再試一次";
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            document.getElementById('third_step_status').innerHTML = `<i class='bi bi-send-exclamation' style='font-size: 95vw; color: orange;'></i>已成功讀取卡片序號：${serialNumber}<br/>請按送出以完成卡片註冊`;
        });
      } catch (error) {
            document.getElementById('third_step_status').innerHTML = "<i class='bi bi-x-circle' style='font-size: 95vw; color: red;'></i>初始化 NDEFReader 元件發生無法復原之錯誤，可能是您的瀏覽器或裝置並不支援WebNFC API，請使用其他瀏覽器或裝置並再試一次";
            document.getElementById('third2final').style.display = 'none';
      }
})

document.getElementById('third2final').addEventListener('click', ()=>{
    document.getElementById('third_step').style.display = 'none';
    document.getElementById('final_step').style.display = 'block';
})