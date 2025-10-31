
    var initialized = false;
    window.addEventListener('load', function() {
      if (!initialized) {
        initialized = true;
        
    window.GPT_CHAT_IFRAME_FUNCTIONS = {};
    window.GPT_CHAT_IFRAME_ELEMENTS = {};
    window.GPT_CHAT_IFRAME_VARIABLES = {};

    window.addEventListener("message", function(event) {
      if (event && event.data && event.data.type === "gpt-maker-button-close") {
        window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat();
      }
      if (event && event.data && event.data.type === "gpt-maker-on-load") {
        window.GPT_CHAT_IFRAME_FUNCTIONS.onLoad('3E9495EA1C6CB19B91B92A708833250D')
      }
    }, false);

    window.GPT_CHAT_IFRAME_FUNCTIONS.onLoad = (token) => {
      if (window.GPT_CHAT_IFRAME_VARIABLES.opened) {
       window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.querySelector('iframe').contentWindow.postMessage(
          {
            type: 'gpt-maker-toogle',
            token: '3E9495EA1C6CB19B91B92A708833250D'
          },
          '*',
        );
      }
    };

    window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat = function() {
      if (window.GPT_CHAT_IFRAME_VARIABLES.opened) {
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.width = '0px';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.height = '0px';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.pointerEvents = 'none';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.opacity = '0';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.bottom = '90px';
        window.GPT_CHAT_IFRAME_VARIABLES.opened = false;
        window.GPT_CHAT_IFRAME_ELEMENTS.button.querySelector('button').innerHTML = '<svg style="width: 40px;" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 612 800" enable-background="new 0 0 612 800" xml:space="preserve"><g><path d="M221.4,602.5C221.4,602.5,221.4,602.5,221.4,602.5c-29.7,0-53.8-24.1-53.8-53.8v-34.5c-36.8-9.2-64.2-42.6-64.2-82.3V274.3   c0-46.8,38-84.8,84.8-84.8h235.6c46.8,0,84.8,38,84.8,84.8V432c0,46.8-38,84.8-84.8,84.8h-98.5c-4.3,0-8.2,2.2-10.4,5.6   c-16.3,26.7-36.8,49.9-60.9,68.7C244.5,598.6,233.2,602.5,221.4,602.5z M188.2,230.7c-24,0-43.6,19.5-43.6,43.6V432   c0,24,19.5,43.6,43.6,43.6c11.4,0,20.6,9.2,20.6,20.6v52.6c0,7.7,6.5,12.5,12.5,12.5h0c2.6,0,5-0.9,7.2-2.6   c20.2-15.8,37.4-35.3,51.1-57.8c9.6-15.7,27-25.4,45.6-25.4h98.5c24,0,43.6-19.5,43.6-43.6V274.3c0-24-19.5-43.6-43.6-43.6H188.2z"/></g></svg>';
      } else {
       window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.width = '80vw';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.height = '65vh';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.pointerEvents = 'all';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.opacity = '1';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.bottom = '108px';
        window.GPT_CHAT_IFRAME_VARIABLES.opened = true;
        window.GPT_CHAT_IFRAME_ELEMENTS.button.querySelector('button').innerHTML = `
  <svg style="width: 30px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" x="0px" y="0px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M50,61.6991815 L84.9800256,26.7191558 C87.2722334,24.4269481 90.9886364,24.4269481 93.2808442,26.7191558 C95.5730519,29.0113636 95.5730519,32.7277666 93.2808442,35.0199741 L54.1504092,74.1504091 C53.0043053,75.296513 51.5021527,75.8695651 50,75.8695651 C48.4978474,75.8695651 46.9956945,75.296513 45.8495906,74.1504091 L6.71915579,35.0199741 C4.42694807,32.7277666 4.42694807,29.0113636 6.71915579,26.7191558 C9.01136348,24.4269481 12.7277664,24.4269481 15.0199742,26.7191558 L50,61.6991815 L50,61.6991815 Z" fill="#fff" fill-rule="nonzero"/></g></svg>`;
      }
        document.querySelectorAll('.popup-widget').forEach(el => el.remove());
      window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.querySelector('iframe').contentWindow.postMessage(
        {
          type: 'gpt-maker-toogle',
          token: '3E9495EA1C6CB19B91B92A708833250D'
        },
        '*',
      );
    }

    window.GPT_CHAT_IFRAME_ELEMENTS.button = document.createElement('div');
    window.GPT_CHAT_IFRAME_ELEMENTS.button.innerHTML = `
    <button type='button' onclick="window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat()" id="click-plug-to-support" style="outline: none; border:none;width: 56px; height: 56px; min-width: 56px; min-height: 56px; border-radius: 50%; cursor: pointer; overflow: hidden; padding: 0; vertical-align: middle; color: #fff; background-color: rgba(46, 106, 224, 1); border-color: #22c38e; display: flex; align-items: center; justify-content: center;" role="button">
        <svg style="width: 40px;" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 612 800" enable-background="new 0 0 612 800" xml:space="preserve"><g><path d="M221.4,602.5C221.4,602.5,221.4,602.5,221.4,602.5c-29.7,0-53.8-24.1-53.8-53.8v-34.5c-36.8-9.2-64.2-42.6-64.2-82.3V274.3   c0-46.8,38-84.8,84.8-84.8h235.6c46.8,0,84.8,38,84.8,84.8V432c0,46.8-38,84.8-84.8,84.8h-98.5c-4.3,0-8.2,2.2-10.4,5.6   c-16.3,26.7-36.8,49.9-60.9,68.7C244.5,598.6,233.2,602.5,221.4,602.5z M188.2,230.7c-24,0-43.6,19.5-43.6,43.6V432   c0,24,19.5,43.6,43.6,43.6c11.4,0,20.6,9.2,20.6,20.6v52.6c0,7.7,6.5,12.5,12.5,12.5h0c2.6,0,5-0.9,7.2-2.6   c20.2-15.8,37.4-35.3,51.1-57.8c9.6-15.7,27-25.4,45.6-25.4h98.5c24,0,43.6-19.5,43.6-43.6V274.3c0-24-19.5-43.6-43.6-43.6H188.2z"/></g></svg>
      </button>      
    `;
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.position = 'fixed';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.height = '56px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.width = '56px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.bottom = '40px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.right = '40px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.zIndex = 999;
    document.body.appendChild(window.GPT_CHAT_IFRAME_ELEMENTS.button);

if (!sessionStorage.getItem('popupShown') &&["IA DIOM AVIATOR "] && 1 > 0) {
  [...["💬Fale com a IA Diom Aviator agora!"]].reverse().forEach((msg, index) => {
    const popup = document.createElement('div');
    popup.className = 'popup-widget'
   popup.style = `
      position: fixed;
      bottom: ${110 + (index * 67)}px;
      right: 40px;
      padding: 10px 20px;
      color: #E1E4E9;
      width: 300px;
      display: inline-block;
      background:rgba(46, 106, 224, 1);
      border: 1px solid white;
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px;
      cursor: pointer;
      max-width: calc(50% - 20px);
      z-index: 2147483647;
      font-size: 12px !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Inter', sans-serif;
      margin: 8px;
      transform: scale(0.8);
      pointer-events: none;
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.alignItems = 'center';
    contentDiv.style.justifyContent = 'center';
    contentDiv.style.position = 'relative';

    const span = document.createElement('span');
    span.innerText = msg;
    contentDiv.appendChild(span);

    if(index === 1 - 1){
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = 'rgb(224, 224, 224)';
    closeButton.style.color = 'black';
    closeButton.style.boxShadow = 'rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.position = 'absolute';
    closeButton.style.zIndex = '2147483643';
    closeButton.style.width = '22px';
    closeButton.style.height = '22px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.textAlign = 'center';
    closeButton.style.fontSize = '14px';
    closeButton.style.top = '-10px';
    closeButton.style.right = '-10px';
    closeButton.style.alignItems = 'center';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.display = 'flex';  
    closeButton.style.justifyContent = 'center';
    closeButton.style.marginLeft = '8px';
    closeButton.style.opacity = '0';
    closeButton.style.transition = 'opacity 0.3s ease';

    popup.addEventListener('mouseenter', () => {
      closeButton.style.opacity = '1';
    });

    popup.addEventListener('mouseleave', () => {
      closeButton.style.opacity = '0';
    });

    closeButton.addEventListener('click', () => {
        document.querySelectorAll('.popup-widget').forEach(el => el.remove());
    });
     popup.appendChild(closeButton);
      
    }

    popup.appendChild(contentDiv);
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = '1';
      popup.style.transform = 'scale(1)';
      popup.style.pointerEvents = 'auto';
    }, 0);
  });

  sessionStorage.setItem('popupShown', 'true');
}
    
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe = document.createElement('div');
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.innerHTML = `
    <iframe
      src="https://app.gptmaker.ai/widget/3E9495EA1C6CB19B91B92A708833250D/iframe?floating=true"
      style="width: 100%;height:100%;"
      frameborder="0"
      allow="microphone; camera"
    ></iframe>   
    `;
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style = "pointer-events: none;opacity: 0;transition: opacity 350ms ease-in-out, bottom 350ms ease-in-out;background: #fff;border: none; position: fixed; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; bottom: 90px; right: 40px; width: 0; max-width: 458px; height: 0; max-height: 824px; border-radius: 0.75rem; display: flex; z-index: 2147483646; overflow: hidden; left: unset;";
    document.body.appendChild(window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe);
  
      }
    });
    if (document.readyState === 'complete') {
      if (!initialized) {
        initialized = true;
        
    window.GPT_CHAT_IFRAME_FUNCTIONS = {};
    window.GPT_CHAT_IFRAME_ELEMENTS = {};
    window.GPT_CHAT_IFRAME_VARIABLES = {};

    window.addEventListener("message", function(event) {
      if (event && event.data && event.data.type === "gpt-maker-button-close") {
        window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat();
      }
      if (event && event.data && event.data.type === "gpt-maker-on-load") {
        window.GPT_CHAT_IFRAME_FUNCTIONS.onLoad('3E9495EA1C6CB19B91B92A708833250D')
      }
    }, false);

    window.GPT_CHAT_IFRAME_FUNCTIONS.onLoad = (token) => {
      if (window.GPT_CHAT_IFRAME_VARIABLES.opened) {
       window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.querySelector('iframe').contentWindow.postMessage(
          {
            type: 'gpt-maker-toogle',
            token: '3E9495EA1C6CB19B91B92A708833250D'
          },
          '*',
        );
      }
    };

    window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat = function() {
      if (window.GPT_CHAT_IFRAME_VARIABLES.opened) {
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.width = '0px';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.height = '0px';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.pointerEvents = 'none';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.opacity = '0';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.bottom = '90px';
        window.GPT_CHAT_IFRAME_VARIABLES.opened = false;
        window.GPT_CHAT_IFRAME_ELEMENTS.button.querySelector('button').innerHTML = '<svg style="width: 40px;" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 612 800" enable-background="new 0 0 612 800" xml:space="preserve"><g><path d="M221.4,602.5C221.4,602.5,221.4,602.5,221.4,602.5c-29.7,0-53.8-24.1-53.8-53.8v-34.5c-36.8-9.2-64.2-42.6-64.2-82.3V274.3   c0-46.8,38-84.8,84.8-84.8h235.6c46.8,0,84.8,38,84.8,84.8V432c0,46.8-38,84.8-84.8,84.8h-98.5c-4.3,0-8.2,2.2-10.4,5.6   c-16.3,26.7-36.8,49.9-60.9,68.7C244.5,598.6,233.2,602.5,221.4,602.5z M188.2,230.7c-24,0-43.6,19.5-43.6,43.6V432   c0,24,19.5,43.6,43.6,43.6c11.4,0,20.6,9.2,20.6,20.6v52.6c0,7.7,6.5,12.5,12.5,12.5h0c2.6,0,5-0.9,7.2-2.6   c20.2-15.8,37.4-35.3,51.1-57.8c9.6-15.7,27-25.4,45.6-25.4h98.5c24,0,43.6-19.5,43.6-43.6V274.3c0-24-19.5-43.6-43.6-43.6H188.2z"/></g></svg>';
      } else {
       window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.width = '80vw';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.height = '65vh';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.pointerEvents = 'all';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.opacity = '1';
        window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style.bottom = '108px';
        window.GPT_CHAT_IFRAME_VARIABLES.opened = true;
        window.GPT_CHAT_IFRAME_ELEMENTS.button.querySelector('button').innerHTML = `
  <svg style="width: 30px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" x="0px" y="0px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M50,61.6991815 L84.9800256,26.7191558 C87.2722334,24.4269481 90.9886364,24.4269481 93.2808442,26.7191558 C95.5730519,29.0113636 95.5730519,32.7277666 93.2808442,35.0199741 L54.1504092,74.1504091 C53.0043053,75.296513 51.5021527,75.8695651 50,75.8695651 C48.4978474,75.8695651 46.9956945,75.296513 45.8495906,74.1504091 L6.71915579,35.0199741 C4.42694807,32.7277666 4.42694807,29.0113636 6.71915579,26.7191558 C9.01136348,24.4269481 12.7277664,24.4269481 15.0199742,26.7191558 L50,61.6991815 L50,61.6991815 Z" fill="#fff" fill-rule="nonzero"/></g></svg>`;
      }
        document.querySelectorAll('.popup-widget').forEach(el => el.remove());
      window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.querySelector('iframe').contentWindow.postMessage(
        {
          type: 'gpt-maker-toogle',
          token: '3E9495EA1C6CB19B91B92A708833250D'
        },
        '*',
      );
    }

    window.GPT_CHAT_IFRAME_ELEMENTS.button = document.createElement('div');
    window.GPT_CHAT_IFRAME_ELEMENTS.button.innerHTML = `
    <button type='button' onclick="window.GPT_CHAT_IFRAME_FUNCTIONS.toogleChat()" id="click-plug-to-support" style="outline: none; border:none;width: 56px; height: 56px; min-width: 56px; min-height: 56px; border-radius: 50%; cursor: pointer; overflow: hidden; padding: 0; vertical-align: middle; color: #fff; background-color: rgba(46, 106, 224, 1); border-color: #22c38e; display: flex; align-items: center; justify-content: center;" role="button">
        <svg style="width: 40px;" fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 612 800" enable-background="new 0 0 612 800" xml:space="preserve"><g><path d="M221.4,602.5C221.4,602.5,221.4,602.5,221.4,602.5c-29.7,0-53.8-24.1-53.8-53.8v-34.5c-36.8-9.2-64.2-42.6-64.2-82.3V274.3   c0-46.8,38-84.8,84.8-84.8h235.6c46.8,0,84.8,38,84.8,84.8V432c0,46.8-38,84.8-84.8,84.8h-98.5c-4.3,0-8.2,2.2-10.4,5.6   c-16.3,26.7-36.8,49.9-60.9,68.7C244.5,598.6,233.2,602.5,221.4,602.5z M188.2,230.7c-24,0-43.6,19.5-43.6,43.6V432   c0,24,19.5,43.6,43.6,43.6c11.4,0,20.6,9.2,20.6,20.6v52.6c0,7.7,6.5,12.5,12.5,12.5h0c2.6,0,5-0.9,7.2-2.6   c20.2-15.8,37.4-35.3,51.1-57.8c9.6-15.7,27-25.4,45.6-25.4h98.5c24,0,43.6-19.5,43.6-43.6V274.3c0-24-19.5-43.6-43.6-43.6H188.2z"/></g></svg>
      </button>      
    `;
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.position = 'fixed';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.height = '56px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.width = '56px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.bottom = '40px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.right = '40px';
    window.GPT_CHAT_IFRAME_ELEMENTS.button.style.zIndex = 999;
    document.body.appendChild(window.GPT_CHAT_IFRAME_ELEMENTS.button);

if (!sessionStorage.getItem('popupShown') &&["IA DIOM AVIATOR "] && 1 > 0) {
  [...["Fale com a IA Diom Aviator agora!"]].reverse().forEach((msg, index) => {
    const popup = document.createElement('div');
    popup.className = 'popup-widget'
    popup.style = `
      position: fixed;
      bottom: ${110 + (index * 67)}px;
      right: 40px;
      padding: 10px 20px;
      color: #E1E4E9;
      width: 300px;
      display: inline-block;
      background: #1F2937DB;
      border: 1px solid #4f46e5;
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 12px;
      cursor: pointer;
      max-width: calc(50% - 20px);
      z-index: 2147483647;
      font-size: 12px !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      font-family: 'Inter', sans-serif;
      margin: 8px;
      transform: scale(0.8);
      pointer-events: none;
    `;
    
    const contentDiv = document.createElement('div');
    contentDiv.style.display = 'flex';
    contentDiv.style.alignItems = 'center';
    contentDiv.style.justifyContent = 'center';
    contentDiv.style.position = 'relative';

    const span = document.createElement('span');
    span.innerText = msg;
    contentDiv.appendChild(span);

    if(index === 1 - 1){
    const closeButton = document.createElement('button');
    closeButton.innerText = 'x';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = 'rgb(224, 224, 224)';
    closeButton.style.color = 'black';
    closeButton.style.boxShadow = 'rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.position = 'absolute';
    closeButton.style.zIndex = '2147483643';
    closeButton.style.width = '22px';
    closeButton.style.height = '22px';
    closeButton.style.borderRadius = '50%';
    closeButton.style.textAlign = 'center';
    closeButton.style.fontSize = '14px';
    closeButton.style.top = '-10px';
    closeButton.style.right = '-10px';
    closeButton.style.alignItems = 'center';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.display = 'flex';  
    closeButton.style.justifyContent = 'center';
    closeButton.style.marginLeft = '8px';
    closeButton.style.opacity = '0';
    closeButton.style.transition = 'opacity 0.3s ease';

    popup.addEventListener('mouseenter', () => {
      closeButton.style.opacity = '1';
    });

    popup.addEventListener('mouseleave', () => {
      closeButton.style.opacity = '0';
    });

    closeButton.addEventListener('click', () => {
        document.querySelectorAll('.popup-widget').forEach(el => el.remove());
    });
     popup.appendChild(closeButton);
      
    }

    popup.appendChild(contentDiv);
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.style.opacity = '1';
      popup.style.transform = 'scale(1)';
      popup.style.pointerEvents = 'auto';
    }, 0);
  });

  sessionStorage.setItem('popupShown', 'true');
}
    
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe = document.createElement('div');
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.innerHTML = `
    <iframe
      src="https://app.gptmaker.ai/widget/3E9495EA1C6CB19B91B92A708833250D/iframe?floating=true"
      style="width: 100%;height:100%;"
      frameborder="0"
      allow="microphone; camera"
    ></iframe>   
    `;
    window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe.style = "pointer-events: none;opacity: 0;transition: opacity 350ms ease-in-out, bottom 350ms ease-in-out;background: #fff;border: none; position: fixed; flex-direction: column; justify-content: space-between; box-shadow: rgba(150, 150, 150, 0.2) 0px 10px 30px 0px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px; bottom: 90px; right: 40px; width: 0; max-width: 458px; height: 0; max-height: 824px; border-radius: 0.75rem; display: flex; z-index: 2147483646; overflow: hidden; left: unset;";
    document.body.appendChild(window.GPT_CHAT_IFRAME_ELEMENTS.containerIframe);
  
      }
    }
    