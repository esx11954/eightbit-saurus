window.onload = function() {
    const cookieName = 'ebsaurus';
    let ebCookie = GetCookie(cookieName);
    checkCookie(ebCookie, cookieName);
    
    document.addEventListener('keydown', keydown_event);
    document.addEventListener('keypress', keypress_event);

};

let command = '';
let commandCode = '';

function checkCookie(cookie, cookieName){
    const ebHash = '695980c946d63a3ff880d57579ffa0a36e71b2a337fde8adc73cfaef983bcb47';
    // 695980c946d63a3ff880d57579ffa0a36e71b2a337fde8adc73cfaef983bcb47
    // No Cookie exists
    if(!cookie){
        const result = prompt("Enter Password");
        sha256(result).then(hash => {
            if (hash == ebHash) {
                // document.cookie = `${cookieName}=${encodeURIComponent(hash)}; Max-Age=${60*60*24*30}; secure`;
                document.cookie = `${cookieName}=${encodeURIComponent(hash)}; expires=${getExpireDate()}; secure`;
            }else{
                alert('Wrong Password');
                document.location.reload();
            }
        });
    // Cookie exists
    }else{
        let ebCookie = GetCookie(cookieName);
        if(ebCookie.split('=')[0] != ebHash){
            alert('The Cookie value has expired.\nYou just ask it to me.');
            document.location.reload();
            let date = new Date();
            date.setTime(date.getTime() - 1);
            document.cookie = `${cookieName}=; expires=${date.toUTCString()}`;
        }
    }
}

function getExpireDate(){
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    return expiryDate.toGMTString();
}

function GetCookie( name ){
    let result = null;
    let cookieName = name + '=';
    let allcookies = document.cookie;

    let position = allcookies.indexOf( cookieName );
    if( position != -1 ){
        let startIndex = position + cookieName.length;
        let endIndex = allcookies.indexOf( ';', startIndex );
        
        if( endIndex == -1 ){
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
            allcookies.substring( startIndex, endIndex ) );
    }

    return result;
}

async function sha256(text){
    const uint8  = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

function keydown_event(e) {
	
	let key = '';
	switch (e.key) {
		case 'ArrowUp':
			key = '↑';
			break;
		case 'ArrowDown':
			key = '↓';
			break;
		case 'ArrowLeft':
			key = '←';
			break;
		case 'ArrowRight':
			key = '→';
			break;
	}
    // command += key;
    commandCode += e.keyCode;
}

function keypress_event(e) {
    // console.log(e.keyCode);
    if (e.keyCode == '99'){
        // command = '';
        commandCode = '';
    }else{
        // command += e.key;
        commandCode += e.keyCode;
        if(commandCode == '38403840373937396698659766986597'){
            const newPw = prompt("Enter New Password");
            sha256(newPw).then(hash => console.log(hash));
            // command = '';
            commandCode = '';
        }
    }
}

