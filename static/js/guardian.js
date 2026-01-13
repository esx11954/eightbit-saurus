window.onload = function() {
    const cookieName = 'eb09';
    let ebCookie = GetCookie(cookieName);
    checkCookie(ebCookie, cookieName);
    
    document.addEventListener('keydown', keydown_event);
    document.addEventListener('keypress', keypress_event);

};

let command = '';
let commandCode = '';

function checkCookie(cookie, cookieName){// 
    const ebHash = '528e123e75cd15304ef193a15f207fc6b29ada28b172d27b32aa767ced77ba4f';
    
    // const ebHash = '20dd4646e5358838b3ee4a92c47d53ecab0a1ce188304f8178e255b748a14f65';
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
            // document.location.reload();
            let date = new Date();
            date.setTime(date.getTime() - 1);
            // document.cookie = `${cookieName}=; expires=${date.toUTCString()}`;
            document.cookie = `${cookieName}=; max-age=0`;
            if(ebCookie.split('=')[0] != ''){
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
            }
            document.location.reload();
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
    console.log(commandCode);
}

function keypress_event(e) {
    
    if (e.keyCode == '99'){
        // command = '';
        console.log('command cleared.');
        commandCode = '';
    }else{
        // command += e.key;
        commandCode += e.keyCode;
        console.log(commandCode);
        rootDir = '/eightbit-saurus/docs/';
        // if(commandCode == '38403840373937396698659766986597'){
        if(commandCode == '383840403739373966986597'){
            const newPw = prompt("Enter New Password");
            sha256(newPw).then(hash => console.log(hash));
            commandCode = '';
        }else if(commandCode == '741066597861186597'){  // java
            document.location = rootDir + 'Java-basic/cat1/page0.8';
            commandCode = '';
        }else if(commandCode == '801128912184116721047911178110'){  // python
            document.location = rootDir + 'Python/page1';
            commandCode = '';
        }else if(commandCode == '79111821146597'){  // ora
            document.location = rootDir + 'oracle/main1';
            commandCode = '';
        }else if(commandCode == '711037310584116'){  // git
            document.location = rootDir + 'Git/page1';
            commandCode = '';
        }else if(commandCode == '721046910182114'){  // her
            document.location = rootDir + 'andHerWorks/cat1/page1';
            commandCode = '';
        }else if(commandCode == '8611873105681006910179111'){  // video
            document.location = rootDir + 'category/videocategory';
            commandCode = '';
        }else if(commandCode == '871197310578110'){  // win
            document.location = rootDir + 'ws/cat1/page1';
            commandCode = '';
        }else if(commandCode == '80112871198311572104'){  // pwsh
            document.location = rootDir + 'command/page1';
            commandCode = '';
        }else if(commandCode == '7410683115'){  // js
            document.location = rootDir + 'javascript/page1';
            commandCode = '';
        }else if(commandCode == '791117610868100741066597861186597'){  // oldjava
            document.location = rootDir + 'java/examination/java_basic/page1';
            commandCode = '';
        }else if(commandCode == '4949494978110'){  // c11n
            document.location = rootDir + 'nw-c11n/page1';
            commandCode = '';
        }

    }
}

