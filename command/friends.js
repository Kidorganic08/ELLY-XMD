const {
  zokou
} = require("../framework/zokou");
const {
  getAllSudoNumbers,
  isSudoTableNotEmpty
} = require("../bdd/sudo");
const conf = require("../set");
zokou({
  'nomCom': "agents",
  'categorie': 'General',
  'reaction': "👊"
}, async (_0x1b06c5, _0x54bb8b, _0x2358bf) => {
  const {
    ms: _0x2aecc0,
    mybotpic: _0x43a6e2
  } = _0x2358bf;
  const _0x21b56d = [{
    'nom': "𝙱.𝙼.𝙱-𝚇𝙼𝙳 from Tanzania 🇹🇿",
    'numero': "255772341432" 
  },{
    'nom': "FrediTech from Tanzania 🇹🇿",
    'numero': "255752593977."
  }, {
    'nom': "Belta from Kenya 🇰🇪",
    'numero': "254114141192"
  }, {
    'nom': "Ibrahim Adams Kenya 🇰🇪",
    'numero': "254710772666"
  }, {
    'nom': "Baraka Bega From Tanzania 🇹🇿",
    'numero': "255762190568"
  }, {
    'nom': "Boniphace from Tanzania 🇹🇿",
    'numero': "255716661569"
  }, {
    'nom': "Joel it🕷️ From Tanzania 🇹🇿",
    'numero': "255714595078"
  }, {
    'nom': "Dullah From Tanzania 🇹🇿",
    'numero': "255716945971"
  }, {
    'nom': "YassinTech From Tanzania 🇹🇿",
    'numero': "255621995482"
  }, {
'nom': "HansTech From Tanzania 🇹🇿",
    'numero': "255692540143"
  }, {
'nom': "🤕",
    'numero': "load...."
  }, {
'nom': "🤕",
    'numero': "Load...."
  }, {
'nom': "Kingfreditech From Tanzania 🇹🇿",
    'numero': "255620814108"
  }, {
    'nom': "🤕",
    'numero': "load...."
  }];
  let _0x2d5c7e = "Hello👋  *I'm 𝙴𝙻𝙻𝚈-𝚇𝙼𝙳 Wa Bot* \nThe Following Numbers Are For  *𝙴𝙻𝙻𝚈-𝚇𝙼𝙳* Agents, \nYou Can Ask Them Anything Regarding b.m.b Bot \nFollow Our Channel For More Tech :https://whatsapp.com/channel/0029VaoadqE84OmC8xlVsQ1M \n*KEEP USING 𝙴𝙻𝙻𝚈-𝚇𝙼𝙳*:\n\n";
  for (const _0x14eeec of _0x21b56d) {
    _0x2d5c7e += "----------------\n(●) " + _0x14eeec.nom + " : https://wa.me/" + _0x14eeec.numero + "\n";
  }
  var _0x11d31d = _0x43a6e2();
  if (_0x11d31d.match(/\.(mp4|gif)$/i)) {
    try {
      _0x54bb8b.sendMessage(_0x1b06c5, {
        'video': {
          'url': _0x11d31d
        },
        'caption': _0x2d5c7e
      }, {
        'quoted': _0x2aecc0
      });
    } catch (_0x55af9c) {
      console.log("🥵🥵 Menu erreur " + _0x55af9c);
      repondre("🥵🥵 Menu erreur " + _0x55af9c);
    }
  } else {
    if (_0x11d31d.match(/\.(jpeg|png|jpg)$/i)) {
      try {
        _0x54bb8b.sendMessage(_0x1b06c5, {
          'image': {
            'url': _0x11d31d
          },
          'caption': _0x2d5c7e
        }, {
          'quoted': _0x2aecc0
        });
      } catch (_0x39b1ed) {
        console.log("🥵🥵 Menu erreur " + _0x39b1ed);
        repondre("🥵🥵 Menu erreur " + _0x39b1ed);
      }
    } else {
      repondre(_0x11d31d);
      repondre("link error");
    }
  }
});
