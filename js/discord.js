var t = {
      pl:{ msg:"Przenosimy Cię na serwer Discord…", btn:"OTWÓRZ DISCORD RĘCZNIE" },
      en:{ msg:"Taking you to the Discord server…", btn:"OPEN DISCORD MANUALLY" }
    };
    function detectLang(){
      try{
        var saved = localStorage.getItem('mythoris_lang');
        if(saved === 'pl' || saved === 'en'){ return saved; }
      }catch(e){}
      var nav = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
      return nav.indexOf('pl') === 0 ? 'pl' : 'en';
    }
    var lang = detectLang();
    var d = t[lang];
    document.getElementById('htmlRoot').setAttribute('lang', lang);
    document.querySelector('[data-i18n="msg"]').textContent = d.msg;
    document.getElementById('discordLink').textContent = d.btn;
    if(lang === 'en'){
      document.querySelector('.fallback').innerHTML = 'Not working? Go back to <a href="https://www.mythoris.eu">WWW.MYTHORIS.EU</a>';
    }
    setTimeout(function(){ window.location.href = 'https://discord.gg/8875JXWfRE'; }, 300);
