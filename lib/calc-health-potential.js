
// calculate potential health values

var fs = require('fs');

function pad(pad, str, padLeft) {
  if (typeof str === 'undefined')
    return pad;
  if (padLeft) {
    return (pad + str).slice(-pad.length);
  } else {
    return (str + pad).substring(0, pad.length);
  }
}

function read(func) {
  var chunks = [];
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk !== null) {
      chunks.push(chunk);
    }
  });
  process.stdin.on('end', function() {
    var jsonData = chunks.join();
    var data = JSON.parse(jsonData);
    func(data);
  });
}

function readFile(filename, func) {
  fs.readFile(filename, 'utf8', function(err, text) {
    if (err) {
      throw err;
    }
    var data = JSON.parse(text);
    func(data);
  });
}

function calcHealth(level, health, EE) {
  if (level == 50) {
    return health;
  }
  var health = health + 2.5 + (EE * 0.5);
  return calcHealth(level + 1, health, EE);
}

function calcSpecial(stats, withMod) {
  var a = [];
  for (var i in stats) {
    if (i == 0) {
      continue;
    }
    var mod = withMod ? stats[i].mod : 0;
    var num = stats[i].value + mod;
    var c = '';
    if (num < 10) {
      var c = '' + num;
    } else {
      var c = charOffset('A', num - 10);
    }
    a.push(c);
  }
  return a.join('');
}

function calcSpecialSum(stats, withMod) {
  var sum = 0;
  for (var i in stats) {
    if (i == 0) {
      continue;
    }
    var mod = withMod ? stats[i].mod : 0;
    var num = stats[i].value + mod;
    sum += num;
  }
  return sum;
}

function charOffset(ch, num) {
  var c = String.fromCharCode(ch.charCodeAt() + num);
  return c;
}

function calcHealthGrade(num) {
  var fsd_num = Math.floor(num / 100);
  var ssd_num = Math.floor((num % 100) / 20);
  var gp = charOffset('A', 6 - fsd_num);
  var gs = charOffset('A', 4 - ssd_num);
  return gp + gs;
}
function calcGrade(dwd) {
  if (dwd.level === 1) {
//     return 'ZZ-ZZ-ZZ';
  }
  var e17g = calcHealthGrade(dwd.e17);
  var e15g = calcHealthGrade(dwd.e15);
  var e13g = calcHealthGrade(dwd.e13);
  return e17g + '-' + e15g + '-' + e13g;
}

function processDwellers(data) {
  var dwellers = data.dwellers.dwellers;
  var dwDetails = [];
  for (var dw_index in dwellers) {
    var dweller = dwellers[dw_index];
    var id = dweller.serializeId;
    var name = dweller.name + ' ' + dweller.lastName;
    var health = dweller.health.maxHealth;
    var level = dweller.experience.currentLevel;
    var spsum = calcSpecialSum(dweller.stats.stats, true);
    var sbsum = calcSpecialSum(dweller.stats.stats, false);
    var stats = calcSpecial(dweller.stats.stats, false);
    var e10 = calcHealth(level, health, 10.0);
    var e13 = calcHealth(level, health, 13.0);
    var e15 = calcHealth(level, health, 15.0);
    var e17 = calcHealth(level, health, 17.0);
    var dwDetail = {
      id: id
      ,name: name
      ,health: health
      ,level: level
      ,spsum: spsum
      ,sbsum: sbsum
      ,stats: stats
      ,e10: e10
      ,e13: e13
      ,e15: e15
      ,e17: e17
      ,opc_e15: Math.floor(e17 - e15)
      ,opc_e13: Math.floor(e17 - e15)
      ,opc_e10: Math.floor(e13 - e10)
    }
    dwDetail.grade = calcGrade(dwDetail);
    dwDetails.push(dwDetail);
  }
  dwDetails.sort(function(lhs, rhs) {
    /*
    var c = lhs.e15 - rhs.e15;
    if (c !== 0) return c;
    // */
    c = lhs.opc_e15 - rhs.opc_e15;
    if (c !== 0) return c;
    c = lhs.opc_e13 - rhs.opc_e13;
    if (c !== 0) return c;
    c = lhs.opc_e10 - rhs.opc_e10;
    if (c !== 0) return c;
    c = lhs.level - rhs.level;
    return c;
  });
  var padding = Array(32).join(' ');
  for (var st_idx in dwDetails) {
    if (st_idx % 10 == 0) {
      console.log('');
      console.log(
        "id\t"+
        pad(padding, "name", false)+ "\t"+
        "health\t"+
        "level\t"+
        "grade   \t"+
        "opc15\t"+
        "opc13\t"+
        "opc10\t"+
        "spsum\t"+
        "sbsum\t"+
        "SPECIAL\t"+
        "e10\t"+
        "e13\t"+
        "e15\t"+
        "e17"
      );
    }
    var dwDetail = dwDetails[st_idx];
    console.log(
      dwDetail.id+ "\t"+
      pad(padding, dwDetail.name, false)+ "\t"+
      dwDetail.health+ "\t"+
      dwDetail.level+ "\t"+
      dwDetail.grade+ "\t"+
      dwDetail.opc_e15+ "\t"+
      dwDetail.opc_e13+ "\t"+
      dwDetail.opc_e10+ "\t"+
      dwDetail.spsum+ "\t"+
      dwDetail.sbsum+ "\t"+
      dwDetail.stats+ "\t"+
      dwDetail.e10+ "\t"+
      dwDetail.e13+ "\t"+
      dwDetail.e15+ "\t"+
      dwDetail.e17
    );
  }
}

readFile('Vault1.sav.json', processDwellers);
