(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.clay = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* toSource by Marcello Bastea-Forte - zlib license */
module.exports = function (object, filter, indent, startingIndent) {
  var seen = []
  return walk(object, filter, indent === undefined ? '  ' : (indent || ''), startingIndent || '', seen)

  function walk (object, filter, indent, currentIndent, seen) {
    var nextIndent = currentIndent + indent
    object = filter ? filter(object) : object

    switch (typeof object) {
      case 'string':
        return JSON.stringify(object)
      case 'boolean':
      case 'number':
      case 'undefined':
        return '' + object
      case 'function':
        return object.toString()
    }

    if (object === null) {
      return 'null'
    }
    if (object instanceof RegExp) {
      return stringifyRegExp(object)
    }
    if (object instanceof Date) {
      return 'new Date(' + object.getTime() + ')'
    }

    var seenIndex = seen.indexOf(object) + 1
    if (seenIndex > 0) {
      return '{$circularReference:' + seenIndex + '}'
    }
    seen.push(object)

    function join (elements) {
      return indent.slice(1) + elements.join(',' + (indent && '\n') + nextIndent) + (indent ? ' ' : '')
    }

    if (Array.isArray(object)) {
      return '[' + join(object.map(function (element) {
        return walk(element, filter, indent, nextIndent, seen.slice())
      })) + ']'
    }
    var keys = Object.keys(object)
    return keys.length ? '{' + join(keys.map(function (key) {
      return (legalKey(key) ? key : JSON.stringify(key)) + ':' + walk(object[key], filter, indent, nextIndent, seen.slice())
    })) + '}' : '{}'
  }
}

var KEYWORD_REGEXP = /^(abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|undefined|var|void|volatile|while|with)$/

function legalKey (string) {
  return /^[a-z_$][0-9a-z_$]*$/gi.test(string) && !KEYWORD_REGEXP.test(string)
}

// Node.js 0.10 doesn't escape slashes in re.toString() or re.source
// when they were not escaped initially.
// Here we check if the workaround is needed once and for all,
// then apply it only for non-escaped slashes.
var isRegExpEscaped = (new RegExp('/')).source === '\\/'

function stringifyRegExp (re) {
  if (isRegExpEscaped) {
    return re.toString()
  }
  var source = re.source.replace(/\//g, function (found, offset, str) {
    if (offset === 0 || str[offset - 1] !== '\\') {
      return '\\/'
    }
    return '/'
  })
  var flags = (re.global && 'g' || '') + (re.ignoreCase && 'i' || '') + (re.multiline && 'm' || '')
  return '/' + source + '/' + flags
}

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'color',
  template: require('../../templates/components/color.tpl'),
  style: require('../../styles/clay/components/color.scss'),
  manipulator: 'color',
  defaults: {
    label: ''
  },
  initialize: function(minified) {
    var HTML = minified.HTML;
    var self = this;
    var useSunlight = self.config.sunlight !== false;
    var sunlightColorMap = {
      '000000': '000000',
      '000055': '001e41',
      '0000aa': '004387',
      '0000ff': '0068ca',
      '005500': '2b4a2c',
      '005555': '27514f',
      '0055aa': '16638d',
      '0055ff': '007dce',
      '00aa00': '5e9860',
      '00aa55': '5c9b72',
      '00aaaa': '57a5a2',
      '00aaff': '4cb4db',
      '00ff00': '8ee391',
      '00ff55': '8ee69e',
      '00ffaa': '8aebc0',
      '00ffff': '84f5f1',
      '550000': '4a161b',
      '550055': '482748',
      '5500aa': '40488a',
      '5500ff': '2f6bcc',
      '555500': '564e36',
      '555555': '545454',
      '5555aa': '4f6790',
      '5555ff': '4180d0',
      '55aa00': '759a64',
      '55aa55': '759d76',
      '55aaaa': '71a6a4',
      '55aaff': '69b5dd',
      '55ff00': '9ee594',
      '55ff55': '9de7a0',
      '55ffaa': '9becc2',
      '55ffff': '95f6f2',
      'aa0000': '99353f',
      'aa0055': '983e5a',
      'aa00aa': '955694',
      'aa00ff': '8f74d2',
      'aa5500': '9d5b4d',
      'aa5555': '9d6064',
      'aa55aa': '9a7099',
      'aa55ff': '9587d5',
      'aaaa00': 'afa072',
      'aaaa55': 'aea382',
      'aaaaaa': 'ababab',
      'ffffff': 'ffffff',
      'aaaaff': 'a7bae2',
      'aaff00': 'c9e89d',
      'aaff55': 'c9eaa7',
      'aaffaa': 'c7f0c8',
      'aaffff': 'c3f9f7',
      'ff0000': 'e35462',
      'ff0055': 'e25874',
      'ff00aa': 'e16aa3',
      'ff00ff': 'de83dc',
      'ff5500': 'e66e6b',
      'ff5555': 'e6727c',
      'ff55aa': 'e37fa7',
      'ff55ff': 'e194df',
      'ffaa00': 'f1aa86',
      'ffaa55': 'f1ad93',
      'ffaaaa': 'efb5b8',
      'ffaaff': 'ecc3eb',
      'ffff00': 'ffeeab',
      'ffff55': 'fff1b5',
      'ffffaa': 'fff6d3'
    };

    /**
     * @param {string|boolean|number} color
     * @returns {string}
     */
    function cssColor(color) {
      if (color === false) { return 'transparent'; }
      if (typeof color === 'number') {
        color = color.toString(16);
      }
      while (color.length < 6) {
        color = '0' + color;
      }

      return '#' + (useSunlight ? sunlightColorMap[color] : color);
    }

    /* eslint-disable  comma-spacing, no-multi-spaces, max-len,
        standard/array-bracket-even-spacing */
    var layout = self.config.layout || [
      [false   , false   , '55ff00', 'aaff55', false   , 'ffff55', 'ffffaa', false   , false   ],
      [false   , 'aaffaa', '55ff55', '00ff00', 'aaff00', 'ffff00', 'ffaa55', 'ffaaaa', false   ],
      ['55ffaa', '00ff55', '00aa00', '55aa00', 'aaaa55', 'aaaa00', 'ffaa00', 'ff5500', 'ff5555'],
      ['aaffff', '00ffaa', '00aa55', '55aa55', '005500', '555500', 'aa5500', 'ff0000', 'ff0055'],
      [false   , '55aaaa', '00aaaa', '005555', 'ffffff', '000000', 'aa5555', 'aa0000', false   ],
      ['55ffff', '00ffff', '00aaff', '0055aa', 'aaaaaa', '555555', '550000', 'aa0055', 'ff55aa'],
      ['55aaff', '0055ff', '0000ff', '0000aa', '000055', '550055', 'aa00aa', 'ff00aa', 'ffaaff'],
      [false   , '5555aa', '5555ff', '5500ff', '5500aa', 'aa00ff', 'ff00ff', 'ff55ff', false   ],
      [false   , false   , false   , 'aaaaff', 'aa55ff', 'aa55aa', false   , false   , false   ]
    ];
    /* eslint-enable */

    var grid = '';
    var itemWidth = 100 / layout[0].length;
    var itemHeight = 100 / layout.length;
    var $elem = self.$element;

    for (var i = 0; i < layout.length; i++) {
      for (var j = 0; j < layout[i].length; j++) {

        var color = layout[i][j];
        var selectable = (color ? ' selectable' : '');

        var roundedTL = (i === 0 && j === 0) || i === 0 && !layout[i][j - 1] ||
                        !layout[i][j - 1] && !layout[i - 1][j] ?
          ' rounded-tl' :
          '';

        var roundedTR = i === 0 && !layout[i][j + 1] ||
                        !layout[i][j + 1] && !layout[i - 1][j] ?
          ' rounded-tr ' :
          '';

        var roundedBL = (i === layout.length - 1 && j === 0) ||
                        i === layout.length - 1 && !layout[i][j - 1] ||
                        !layout[i][j - 1] && !layout[i + 1][j] ?
          ' rounded-bl' :
          '';

        var roundedBR = i === layout.length - 1 && !layout[i][j + 1] ||
                        !layout[i][j + 1] && !layout[i + 1][j] ?
          ' rounded-br' :
          '';

        grid += '<i ' +
          'class="color-box ' + selectable + roundedTL + roundedTR + roundedBL +
              roundedBR + '" ' +
          'data-value="' + parseInt(color, 16) + '" ' +
          'style="' +
            'width:' + itemWidth + '%; ' +
            'height:' + itemHeight + '%; ' +
            'background:' + cssColor(color) + ';">' +
        '</i>';
      }
    }

    $elem.select('.color-box-container').add(HTML(grid));

    var $valueDisplay = $elem.select('.value');
    var $picker = $elem.select('.picker-wrap');
    var disabled = self.$manipulatorTarget.get('disabled');

    $elem.select('label').on('click', function(ev) {
      if (!disabled) {
        $picker.set('show'); // toggle visibility
      }
    });

    self.on('change', function() {
      var value = self.get();
      $valueDisplay.set('$background-color', cssColor(value));
      $elem.select('.color-box').set('-selected');
      $elem.select('.color-box[data-value="' + value + '"]').set('+selected');
    });

    $elem.select('.color-box.selectable').on('click', function(ev) {
      self.set(parseInt(ev.target.dataset.value, 10));
      $picker.set('-show');
    });

    $picker.on('click', function() {
      $picker.set('-show');
    });

    self.on('disabled', function() {
      disabled = true;
    });

    self.on('enabled', function() {
      disabled = false;
    });

  }
};

},{"../../styles/clay/components/color.scss":11,"../../templates/components/color.tpl":15}],3:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'footer',
  template: require('../../templates/components/footer.tpl'),
  manipulator: 'html',
  defaults: {
    attributes: {}
  }
};

},{"../../templates/components/footer.tpl":16}],4:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'heading',
  template: require('../../templates/components/heading.tpl'),
  manipulator: 'html',
  defaults: {
    attributes: {},
    size: 4
  }
};

},{"../../templates/components/heading.tpl":17}],5:[function(require,module,exports){
'use strict';

module.exports = {
  color: require('./color'),
  footer: require('./footer'),
  heading: require('./heading'),
  input: require('./input'),
  select: require('./select'),
  submit: require('./submit'),
  text: require('./text'),
  toggle: require('./toggle')
};

},{"./color":2,"./footer":3,"./heading":4,"./input":6,"./select":7,"./submit":8,"./text":9,"./toggle":10}],6:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'input',
  template: require('../../templates/components/input.tpl'),
  style: require('../../styles/clay/components/input.scss'),
  manipulator: 'val',
  defaults: {
    label: '',
    attributes: {}
  }
};

},{"../../styles/clay/components/input.scss":12,"../../templates/components/input.tpl":18}],7:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'select',
  template: require('../../templates/components/select.tpl'),
  style: require('../../styles/clay/components/select.scss'),
  manipulator: 'val',
  defaults: {
    label: '',
    options: []
  },
  initialize: function() {
    var self = this;

    var $value = self.$element.select('.value');

    self.on('change', function(ev) {
      var value = self.$manipulatorTarget.select('option:checked').get('innerHTML');
      $value.set('innerHTML', value);
    });
  }
};

},{"../../styles/clay/components/select.scss":13,"../../templates/components/select.tpl":19}],8:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'submit',
  template: require('../../templates/components/submit.tpl'),
  manipulator: 'val',
  defaults: {
    label: '',
    attributes: {}
  }
};

},{"../../templates/components/submit.tpl":20}],9:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'text',
  template: require('../../templates/components/text.tpl'),
  manipulator: 'html',
  defaults: {
    attributes: {}
  }
};

},{"../../templates/components/text.tpl":21}],10:[function(require,module,exports){
'use strict';

module.exports = {
  name: 'toggle',
  template: require('../../templates/components/toggle.tpl'),
  style: require('../../styles/clay/components/toggle.scss'),
  manipulator: 'checked',
  defaults: {
    label: '',
    attributes: {}
  }
};

},{"../../styles/clay/components/toggle.scss":14,"../../templates/components/toggle.tpl":22}],11:[function(require,module,exports){
module.exports = ".component-color .value { width: 2.2652rem; height: 1.4rem; border-radius: 0.7rem; box-shadow: #2f2f2f 0 0.1rem 0.1rem; }\n\n.component-color input:disabled ~ .value, .component-color input:disabled ~ .label { opacity: 0.25; }\n\n.component-color .picker-wrap { left: 0; top: 0; top: 0; right: 0; bottom: 0; position: fixed; padding: 1rem; background: rgba(0, 0, 0, 0.7); opacity: 0; -webkit-transition: opacity 70ms ease-in 175ms; transition: opacity 70ms ease-in 175ms; pointer-events: none; z-index: 100; }\n\n.component-color .picker-wrap .picker { padding: 1rem; background: #f2f2f2; border-radius: 0.25rem; }\n\n.component-color .picker-wrap.show { -webkit-transition-delay: 0ms; transition-delay: 0ms; pointer-events: auto; opacity: 1; }\n\n.component-color .color-box-wrap { box-sizing: border-box; position: relative; height: 0; width: 100%; padding: 0 0 100% 0; margin: 0.6em 0 0em; }\n\n.component-color .color-box-wrap .color-box-container { position: absolute; height: 99.97%; width: 100%; left: 0; top: 0; }\n\n.component-color .color-box-wrap .color-box-container .color-box { float: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-tl { border-top-left-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-tr { border-top-right-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-bl { border-bottom-left-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.rounded-br { border-bottom-right-radius: 0.25rem; }\n\n.component-color .color-box-wrap .color-box-container .color-box.selected { -webkit-transform: scale(1.15); transform: scale(1.15); border-radius: 0.25rem; box-shadow: #111 0 0 0.24rem; position: relative; z-index: 100; }\n";

},{}],12:[function(require,module,exports){
module.exports = ".component-input { display: block; }\n\n.component-input .label { padding-bottom: 0.7rem; }\n\n.component-input .input { position: relative; min-width: 100%; margin-top: 0.7rem; margin-left: 0; }\n\n.component-input input { display: block; width: 100%; background: #333333; border-radius: 0.25rem; padding: 0.35rem 0.375rem; border: none; vertical-align: baseline; color: #ffffff; font-size: inherit; }\n\n.component-input input::-webkit-input-placeholder { color: #858585; }\n\n.component-input input::-moz-placeholder { color: #858585; }\n\n.component-input input:-moz-placeholder { color: #858585; }\n\n.component-input input:-ms-input-placeholder { color: #858585; }\n\n.component-input input:focus { border: none; box-shadow: none; }\n\n.component-input input:focus::-webkit-input-placeholder { color: #666666; }\n\n.component-input input:focus::-moz-placeholder { color: #666666; }\n\n.component-input input:focus:-moz-placeholder { color: #666666; }\n\n.component-input input:focus:-ms-input-placeholder { color: #666666; }\n";

},{}],13:[function(require,module,exports){
module.exports = ".component-select { position: relative; }\n\n.component-select .value { position: relative; padding-right: 1.1rem; }\n\n.component-select .value:after { content: \"\"; position: absolute; right: 0; top: 50%; margin-top: -0.1rem; height: 0; width: 0; border-left: 0.425rem solid transparent; border-right: 0.425rem solid transparent; border-top: 0.425rem solid #ececec; }\n\n.component-select select { opacity: 0; position: absolute; display: block; left: 0; right: 0; top: 0; bottom: 0; background: #000; width: 100%; border: none; margin: 0; padding: 0; }\n";

},{}],14:[function(require,module,exports){
module.exports = ".component-toggle input { display: none; }\n\n.component-toggle .graphic { display: inline-block; position: relative; }\n\n.component-toggle .graphic .slide { display: block; border-radius: 1.05rem; height: 1.05rem; width: 2.2652rem; background: #2f2f2f; -webkit-transition: background-color 150ms linear; transition: background-color 150ms linear; }\n\n.component-toggle .graphic .marker { background: #ececec; width: 1.4rem; height: 1.4rem; border-radius: 1.4rem; position: absolute; left: 0; display: block; top: -0.175rem; -webkit-transition: -webkit-transform 150ms linear; transition: -webkit-transform 150ms linear; transition: transform 150ms linear; transition: transform 150ms linear, -webkit-transform 150ms linear; box-shadow: #2f2f2f 0 0.1rem 0.1rem; }\n\n.component-toggle input:checked + .graphic .slide { background: #993d19; }\n\n.component-toggle input:checked + .graphic .marker { background: #ff4700; -webkit-transform: translateX(0.8652rem); transform: translateX(0.8652rem); }\n";

},{}],15:[function(require,module,exports){
module.exports = "<div class=\"component-color\">\n  <label class=\"component\">\n    <input\n      data-manipulator-target\n      type=\"hidden\"\n    />\n    <span class=\"label\">{{{label}}}</span>\n    <span class=\"value\"></span>\n  </label>\n  <div class=\"picker-wrap\">\n    <div class=\"picker\">\n      <div class=\"color-box-wrap\">\n        <div class=\"color-box-container\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";

},{}],16:[function(require,module,exports){
module.exports = "<div\n  data-manipulator-target\n  class=\"item-container-footer\"\n  {{each attributes}} {{this.key}}=\"{{this.value}}\" {{/each}}\n></div>\n";

},{}],17:[function(require,module,exports){
module.exports = "<div class=\"component component-heading\">\n  <h{{size}} data-manipulator-target {{each key: attributes}}{{key}}=\"{{this}}\"{{/each}}></h{{size}}>\n</div>\n";

},{}],18:[function(require,module,exports){
module.exports = "<label class=\"component component-input\">\n  <span class=\"label\">{{{label}}}</span>\n  <span class=\"input\">\n    <input\n      data-manipulator-target\n      {{each key: attributes}}{{key}}=\"{{this}}\"{{/each}}\n    />\n  </span>\n</label>\n";

},{}],19:[function(require,module,exports){
module.exports = "<label class=\"component component-select\">\n  <span class=\"label\">{{{label}}}</span>\n  <span class=\"value\"></span>\n  <select data-manipulator-target>\n    {{each options}}\n      <option value=\"{{this.value}}\" class=\"item-select-option\">{{this.label}}</option>\n    {{/each}}\n  </select>\n</label>\n";

},{}],20:[function(require,module,exports){
module.exports = "<div class=\"component component-button\">\n  <button\n    data-manipulator-target\n    type=\"submit\"\n    {{each key: attributes}}{{key}}=\"{{this}}\"{{/each}}\n  >\n    {{{label}}}\n  </button>\n</div>\n";

},{}],21:[function(require,module,exports){
module.exports = "<div class=\"component component-text\">\n  <p data-manipulator-target {{each key: attributes}}{{key}}=\"{{this}}\"{{/each}}></p>\n</div>\n";

},{}],22:[function(require,module,exports){
module.exports = "<label class=\"component component-toggle\">\n  <span class=\"label\">{{{label}}}</span>\n  <span class=\"input\">\n    <input\n      data-manipulator-target\n      type=\"checkbox\"\n      {{each key: attributes}}{{key}}=\"{{this}}\"{{/each}}\n    />\n    <span class=\"graphic\">\n      <span class=\"slide\"></span>\n      <span class=\"marker\"></span>\n    </span>\n  </span>\n</label>\n";

},{}],23:[function(require,module,exports){
module.exports = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><style>@font-face{font-family:PFDinDisplayProRegularWebfont;src:url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff\");font-weight:400;font-style:normal}a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,p,pre,q,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;outline:0;font-size:100%;font:inherit;vertical-align:baseline}button,input,textarea{outline:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}html{box-sizing:border-box}*,:after,:before{box-sizing:inherit}body,html{font-weight:400;font-family:PFDinDisplayPro-Regular,PFDinDisplayProRegularWebfont,sans-serif;-webkit-font-smoothing:antialiased;font-size:17px;line-height:1.4;height:100%;color:#fff}body.platform-ios,html.platform-ios{font-size:16px}body{background-color:#333;padding:.7rem .75rem}h1,h2,h3,h4{text-transform:uppercase;font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;text-transform:uppercase;position:relative;top:.05rem;line-height:.9}.platform-android h1,.platform-android h2,.platform-android h3,.platform-android h4{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}h1{font-size:2rem;line-height:2.8rem}h2{font-size:1.8rem;line-height:2.8rem}h3{font-size:1.5rem;line-height:2.8rem}h4{font-size:1.2rem;line-height:1.4rem}h5{font-size:1rem;line-height:1.4rem}h6{font-size:.8rem;line-height:1.4rem}.component{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-bottom:.7rem}.component .input{white-space:nowrap;display:-webkit-box;display:-webkit-flex;display:flex;max-width:50%;margin-left:.75rem}.component.invalid .input:after{content:\"!\";display:inline-block;color:#fff;background:#ff4700;border-radius:.55rem;width:1.1rem;text-align:center;height:1.1rem;font-size:.825rem;vertical-align:middle;line-height:1.1rem;box-shadow:#2f2f2f 0 .1rem .1rem;font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;-webkit-box-flex:0;-webkit-flex:0 0 1.1rem;flex:0 0 1.1rem;margin-left:.3rem}.platform-android .component.invalid .input:after{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}.section{background:#484848;border-radius:.25rem;margin-bottom:1rem;box-shadow:#2f2f2f 0 .15rem .25rem}.section .component{padding-top:.7rem;padding-right:.75rem;padding-left:.75rem;position:relative}.section .component:first-child,.section .component:last-child{padding-bottom:.7rem}.section .component:first-child:after,.section .component:last-child:after{display:none}.section .component:after{content:\"\";background:#666;display:block;position:absolute;bottom:0;left:.375rem;right:.375rem;height:1px;pointer-events:none}.section .component-heading:first-child{background:#414141;border-radius:.25rem .25rem 0 0}label.component{-webkit-tap-highlight-color:rgba(255,255,255,.1)}label.component:active{background-color:rgba(255,255,255,.1)}strong{font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;color:#ff4700}.platform-android strong{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}a{color:#858585}a:hover{color:inherit}.inputs{display:block;width:100%;border-collapse:collapse}.section .inputs .component{display:table;width:100%}.section .inputs .component .input,.section .inputs .component .label{display:table-cell}.section .inputs .component .input{text-align:right}.section .inputs .component.invalid .input:after{content:\"!\";display:inline-block;color:#fff;background:#ff4700;border-radius:.25rem;width:1.2em;text-align:center;height:1.2em;font-size:1em;vertical-align:middle;line-height:1.3em;margin-left:-.7em;position:absolute;font-weight:400;font-family:PFDinDisplayPro-Regular,PFDinDisplayProRegularWebfont,sans-serif}.section .inputs .component.invalid .input input{color:#ff4700;padding-right:1em}.section .inputs .component.invalid .input input::-webkit-input-placeholder{color:#ff4700}.section .inputs .component.invalid .input input::-moz-placeholder{color:#ff4700}.section .inputs .component.invalid .input input:-moz-placeholder{color:#ff4700}.section .inputs .component.invalid .input input:-ms-input-placeholder{color:#ff4700}.button,button{font-weight:400;font-family:PFDinDisplayPro-Medium,PFDinDisplayProRegularWebfont,sans-serif;text-transform:uppercase;background-color:#484848;border-radius:.25rem;font-size:1rem;line-height:1;border:none;display:block;color:#fff;min-width:12rem;text-align:center;margin:0 auto;-webkit-tap-highlight-color:transparent;padding:.7rem}.platform-android .button,.platform-android button{font-family:PFDinDisplayProRegularWebfont,sans-serif;font-weight:700;letter-spacing:.025em}.platform-ios .button,.platform-ios button{padding:.6rem}.button:disabled,button:disabled{background-color:#414141;color:#858585}.button:not(:disabled):active,button:not(:disabled):active{background-color:#858585}.button.orange,.button[type=submit],button.orange,button[type=submit]{background-color:#ff4700}.button.orange:disabled,.button[type=submit]:disabled,button.orange:disabled,button[type=submit]:disabled{background-color:#993d19;color:#414141}.button.orange:not(:disabled):active,.button[type=submit]:not(:disabled):active,button.orange:not(:disabled):active,button[type=submit]:not(:disabled):active{background-color:red}.button.light-grey,button.light-grey{background-color:#5b5b5b}a.button{text-decoration:none;color:#fff}</style><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no\"><script>window.returnTo=\"$$RETURN_TO$$\",window.clayConfig=$$CONFIG$$,window.claySettings=$$SETTINGS$$,window.customFn=$$CUSTOM_FN$$,window.clayComponents=$$COMPONENTS$$;</script></head><body><form id=\"main-form\" class=\"inputs\"></form><script>!function t(e,n,r){function i(u,a){if(!n[u]){if(!e[u]){var c=\"function\"==typeof require&&require;if(!a&&c)return c(u,!0);if(o)return o(u,!0);var s=new Error(\"Cannot find module '\"+u+\"'\");throw s.code=\"MODULE_NOT_FOUND\",s}var f=n[u]={exports:{}};e[u][0].call(f.exports,function(t){var n=e[u][1][t];return i(n?n:t)},f,f.exports,t,e,n,r)}return n[u].exports}for(var o=\"function\"==typeof require&&require,u=0;u<r.length;u++)i(r[u]);return i}({1:[function(t,e,n){\"use strict\";var r=t(\"./vendor/minified\"),i=t(\"./lib/clay-config\"),o=r.$,u=r._,a=u.extend([],window.clayConfig||[]),c=u.extend({},window.claySettings||{}),s=window.returnTo||\"pebblejs://close#\",f=window.customFn||function(){},l=window.clayComponents||{},p=window.navigator.userAgent.match(/Android/)?\"android\":\"ios\";document.documentElement.classList.add(\"platform-\"+p),u.eachObj(l,function(t,e){i.registerComponent(e)});var d=o(\"#main-form\"),m=new i(c,a,d);d.on(\"submit\",function(){location.href=s+encodeURIComponent(JSON.stringify(m.getSettings()))}),f.call(m,r),m.build()},{\"./lib/clay-config\":2,\"./vendor/minified\":8}],2:[function(t,e,n){\"use strict\";function r(t,e,n){function s(t,e){if(Array.isArray(t))t.forEach(function(t){s(t,e)});else if(\"section\"===t.type){var n=i('<div class=\"section\">');e.add(n),s(t.items,n)}else{var r=new u(t).initialize();t.id&&(m[t.id]=r),t.appKey&&(g[t.appKey]=r),d.push(r);var o=\"undefined\"!=typeof p[t.appKey]?p[t.appKey]:t.defaultValue||\"\";r.set(o),e.add(r.$element)}}function f(t){if(!h)throw new Error(\"ClayConfig not built. build() must be run before you can run \"+t+\"()\");return!0}var l=this,p=o.copyObj(t),d=[],m={},g={},h=!1;l.EVENTS={BEFORE_BUILD:\"BEFORE_BUILD\",AFTER_BUILD:\"AFTER_BUILD\"},a.updateProperties(l.EVENTS,{writable:!1}),l.getAllItems=function(){return f(\"getAllItems\"),d},l.getItemByAppKey=function(t){return f(\"getItemByAppKey\"),g[t]},l.getItemById=function(t){return f(\"getItemById\"),m[t]},l.getItemsByType=function(t){return f(\"getItemsByType\"),d.filter(function(e){return e.config.type===t})},l.getSettings=function(){return f(\"getSettings\"),o.eachObj(g,function(t,e){p[t]=e.get()}),p},l.registerComponent=r.registerComponent,l.build=function(){return l.trigger(l.EVENTS.BEFORE_BUILD),s(e,n),h=!0,l.trigger(l.EVENTS.AFTER_BUILD),l},c.call(l,n),a.updateProperties(l,{writable:!1,configurable:!1})}var i=t(\"../vendor/minified\").HTML,o=t(\"../vendor/minified\")._,u=t(\"./clay-item\"),a=t(\"../lib/utils\"),c=t(\"./clay-events\"),s=t(\"./component-registry\"),f=t(\"./manipulators\");r.registerComponent=function(t){var e=o.copyObj(t);if(s[e.name])return console.warn(\"Component: \"+e.name+\" is already registered. If you wish to override the existing functionality, you must provide a new name\"),!1;if(\"string\"==typeof e.manipulator&&(e.manipulator=f[t.manipulator],!e.manipulator))throw new Error(\"The manipulator: \"+t.manipulator+\" does not exist in the built-in manipulators.\");if(\"function\"!=typeof e.manipulator.set||\"function\"!=typeof e.manipulator.get)throw new Error(\"The manipulator must have both a `get` and `set` method\");if(e.style){var n=document.createElement(\"style\");n.type=\"text/css\",n.appendChild(document.createTextNode(e.style)),document.head.appendChild(n)}return s[e.name]=e,!0},e.exports=r},{\"../lib/utils\":7,\"../vendor/minified\":8,\"./clay-events\":3,\"./clay-item\":4,\"./component-registry\":5,\"./manipulators\":6}],3:[function(t,e,n){\"use strict\";function r(t){function e(t){return t.split(\" \").map(function(t){return\"|\"+t.replace(/^\\|/,\"\")}).join(\" \")}function n(t,e){var n=o.find(a,function(e){return e.handler===t?e:null});return n||(n={handler:t,proxy:e},a.push(n)),n.proxy}function r(t){return o.find(a,function(e){return e.handler===t?e.proxy:null})}var u=this,a=[];u.on=function(r,i){var o=e(r),u=this,a=n(i,function(){i.apply(u,arguments)});return t.on(o,a),u},u.off=function(t){var e=r(t);return e&&i.off(e),u},u.trigger=function(e,n){return t.trigger(e,n),u}}var i=t(\"../vendor/minified\").$,o=t(\"../vendor/minified\")._;e.exports=r},{\"../vendor/minified\":8}],4:[function(t,e,n){\"use strict\";function r(t){var e=this,n=i[t.type];if(!n)throw new Error(\"the component: \"+t.type+\" is not registered. Make sure to register it with ClayConfig.registerComponent()\");var r=c.extend({},n.defaults,t);e.id=t.id||null,e.appKey=t.appKey||null,e.config=t,e.$element=s(n.template.trim(),r),e.$manipulatorTarget=e.$element.select(\"[data-manipulator-target]\"),e.$manipulatorTarget.length||(e.$manipulatorTarget=e.$element),e.initialize=function(){return\"function\"==typeof n.initialize&&n.initialize.call(e,o),e},a.call(e,e.$manipulatorTarget),c.eachObj(n.manipulator,function(t,n){e[t]=n.bind(e)}),u.updateProperties(e,{writable:!1,configurable:!1})}var i=t(\"./component-registry\"),o=t(\"../vendor/minified\"),u=t(\"../lib/utils\"),a=t(\"./clay-events\"),c=o._,s=o.HTML;e.exports=r},{\"../lib/utils\":7,\"../vendor/minified\":8,\"./clay-events\":3,\"./component-registry\":5}],5:[function(t,e,n){\"use strict\";e.exports={}},{}],6:[function(t,e,n){\"use strict\";function r(){return this.$manipulatorTarget.set(\"disabled\",!0),this.trigger(\"disabled\")}function i(){return this.$manipulatorTarget.set(\"disabled\",!1),this.trigger(\"enabled\")}e.exports={html:{get:function(){return this.$manipulatorTarget.get(\"innerHTML\")},set:function(t){return this.$manipulatorTarget.set(\"innerHTML\",t),this.trigger(\"change\")}},val:{get:function(){return this.$manipulatorTarget.get(\"value\")},set:function(t){return this.$manipulatorTarget.set(\"value\",t),this.trigger(\"change\")},disable:r,enable:i},checked:{get:function(){return this.$manipulatorTarget.get(\"checked\")},set:function(t){return this.$manipulatorTarget.set(\"checked\",t),this.trigger(\"change\")},disable:r,enable:i},color:{get:function(){return parseInt(this.$manipulatorTarget.get(\"value\"),16)},set:function(t){switch(typeof t){case\"number\":t=t.toString(16);break;case\"string\":t=t.replace(/^#|^0x/,\"\")}return this.$manipulatorTarget.set(\"value\",t||\"000000\"),this.trigger(\"change\")},disable:r,enable:i}}},{}],7:[function(t,e,n){\"use strict\";e.exports.updateProperties=function(t,e){Object.getOwnPropertyNames(t).forEach(function(n){Object.defineProperty(t,n,e)})}},{}],8:[function(t,e,n){e.exports=function(){function t(t){return t.substr(0,3)}function e(t){return t!=ot?\"\"+t:\"\"}function n(t,e){return typeof t==e}function r(t){return n(t,\"string\")}function i(t){return!!t&&n(t,\"object\")}function o(t){return t&&t.nodeType}function u(t){return n(t,\"number\")}function a(t){return t}function c(t,n,r){return e(t).replace(n,r!=ot?r:\"\")}function s(t){return c(t,/^\\s+|\\s+$/g)}function f(t,e,n){for(var r in t)t.hasOwnProperty(r)&&e.call(n||t,r,t[r]);return t}function l(t,e,n){if(t)for(var r=0;r<t.length;r++)e.call(n||t,t[r],r);return t}function p(t,e,n){var r=[],i=j(e)?e:function(t){return e!=t};return l(t,function(e,o){i.call(n||t,e,o)&&r.push(e)}),r}function d(t,e,n,r){var i=[];return t(e,function(t,o){I(t=n.call(r||e,t,o))?l(t,function(t){i.push(t)}):t!=ot&&i.push(t)}),i}function m(t,e,n){var r=[];return l(t,function(i,o){r.push(e.call(n||t,i,o))}),r}function g(t,e){var n={};return l(t,function(t,r){n[t]=e}),n}function h(t,e){var n=e||{};for(var r in t)n[r]=t[r];return n}function v(t,e){for(var n=e,r=0;r<t.length;r++)n=h(t[r],n);return n}function y(t){return j(t)?t:function(e,n){return t===e?n:void 0}}function b(t,e,n){return e==ot?n:0>e?Math.max(t.length+e,0):Math.min(t.length,e)}function $(t,e,n,r){for(var i,o=y(e),u=b(t,r,t.length),a=b(t,n,0);u>a;a++)if((i=o.call(t,t[a],a))!=ot)return i}function w(t,e,n){var r=[];if(t)for(var i=b(t,n,t.length),o=b(t,e,0);i>o;o++)r.push(t[o]);return r}function x(t){return m(t,a)}function T(t,e,n){return j(t)?t.apply(n&&e,m(n||e,a)):void 0}function E(t,e,n){return m(t,function(t){return T(t,e,n)})}function C(t){return\"\\\\u\"+(\"0000\"+t.charCodeAt(0).toString(16)).slice(-4)}function M(t){return c(t,/[\\x00-\\x1f'\"\\u2028\\u2029]/g,C)}function A(t,e){return t.split(e)}function N(t,e){if(st[t])return st[t];var n=\"with(_.isObject(obj)?obj:{}){\"+m(A(t,/{{|}}}?/g),function(t,e){var n,r=s(t),i=c(r,/^{/),o=r==i?\"esc(\":\"\";return e%2?(n=/^each\\b(\\s+([\\w_]+(\\s*,\\s*[\\w_]+)?)\\s*:)?(.*)/.exec(i))?\"each(\"+(s(n[4])?n[4]:\"this\")+\", function(\"+n[2]+\"){\":(n=/^if\\b(.*)/.exec(i))?\"if(\"+n[1]+\"){\":(n=/^else\\b\\s*(if\\b(.*))?/.exec(i))?\"}else \"+(n[1]?\"if(\"+n[2]+\")\":\"\")+\"{\":(n=/^\\/(if)?/.exec(i))?n[1]?\"}\\n\":\"});\\n\":(n=/^(var\\s.*)/.exec(i))?n[1]+\";\":(n=/^#(.*)/.exec(i))?n[1]:(n=/(.*)::\\s*(.*)/.exec(i))?\"print(\"+o+'_.formatValue(\"'+M(n[2])+'\",'+(s(n[1])?n[1]:\"this\")+(o&&\")\")+\"));\\n\":\"print(\"+o+(s(i)?i:\"this\")+(o&&\")\")+\");\\n\":t?'print(\"'+M(t)+'\");\\n':void 0}).join(\"\")+\"}\",r=new Function(\"obj\",\"each\",\"esc\",\"print\",\"_\",n),i=function(t,n){var i=[];return r.call(n||t,t,function(t,e){I(t)?l(t,function(t,n){e.call(t,t,n)}):f(t,function(t,n){e.call(n,t,n)})},e||a,function(){T(i.push,i,arguments)},Z),i.join(\"\")};return ft.push(i)>ct&&delete st[ft.shift()],st[t]=i}function L(t){return c(t,/[<>'\"&]/g,function(t){return\"&#\"+t.charCodeAt(0)+\";\"})}function O(t,e){return N(t,L)(e)}function S(t){return function(e,n,r){return t(this,e,n,r)}}function j(t){return\"function\"==typeof t&&!t.item}function I(t){return t&&t.length!=ot&&!r(t)&&!o(t)&&!j(t)&&t!==Q}function _(t){return parseFloat(c(t,/^[^\\d-]+/))}function B(t){return t[tt]=t[tt]||++rt}function H(t,e){var n,r=[],i={};return J(t,function(t){J(e(t),function(t){i[n=B(t)]||(r.push(t),i[n]=!0)})}),r}function F(t,e){var n={$position:\"absolute\",$visibility:\"hidden\",$display:\"block\",$height:ot},r=t.get(n),i=t.set(n).get(\"clientHeight\");return t.set(r),i*e+\"px\"}function R(t,n,i,o,u){return j(n)?this.on(ot,t,n,i,o):r(o)?this.on(t,n,i,ot,o):this.each(function(r,s){J(t?V(t,r):r,function(t){J(e(n).split(/\\s/),function(e){function n(e,n,r){var a=!u,c=u?r:t;if(u)for(var p=z(u,t);c&&c!=t&&!(a=p(c));)c=c.parentNode;return!a||f!=e||i.apply(k(c),o||[n,s])&&\"?\"==l||\"|\"==l}function r(t){n(f,t,t.target)||(t.preventDefault(),t.stopPropagation())}var f=c(e,/[?|]/g),l=c(e,/[^?|]/g),p=(\"blur\"==f||\"focus\"==f)&&!!u,m=rt++;t.addEventListener(f,r,p),t.M||(t.M={}),t.M[m]=n,i.M=d(J,[i.M,function(){t.removeEventListener(f,r,p),delete t.M[m]}],a)})})})}function q(t){E(t.M),t.M=ot}function D(t){it?it.push(t):setTimeout(t,0)}function U(t,e,n){return V(t,e,n)[0]}function P(t,e,n){var r=k(document.createElement(t));return I(e)||e!=ot&&!i(e)?r.add(e):r.set(e).add(n)}function K(t){return d(J,t,function(t){var e;return I(t)?K(t):o(t)?(e=t.cloneNode(!0),e.removeAttribute&&e.removeAttribute(\"id\"),e):t})}function k(t,e,n){return j(t)?D(t):new Y(V(t,e,n))}function V(t,e,n){function i(t){return I(t)?d(J,t,i):t}function u(t){return p(d(J,t,i),function(t){for(var r=t;r=r.parentNode;)if(r==e[0]||n)return r==e[0]})}return e?1!=(e=V(e)).length?H(e,function(e){return V(t,e,n)}):r(t)?1!=o(e[0])?[]:n?u(e[0].querySelectorAll(t)):e[0].querySelectorAll(t):u(t):r(t)?document.querySelectorAll(t):d(J,t,i)}function z(t,e){function n(t,e){var n=RegExp(\"(^|\\\\s+)\"+t+\"(?=$|\\\\s)\",\"i\");return function(r){return t?n.test(r[e]):!0}}var i={},a=i;if(j(t))return t;if(u(t))return function(e,n){return n==t};if(!t||\"*\"==t||r(t)&&(a=/^([\\w-]*)\\.?([\\w-]*)$/.exec(t))){var c=n(a[1],\"tagName\"),s=n(a[2],\"className\");return function(t){return 1==o(t)&&c(t)&&s(t)}}return e?function(n){return k(t,e).find(n)!=ot}:(k(t).each(function(t){i[B(t)]=!0}),function(t){return i[B(t)]})}function J(t,e){return I(t)?l(t,e):t!=ot&&e(t,0),t}function W(){this.state=null,this.values=[],this.parent=null}function X(){var t=[],e=arguments,n=e.length,r=0,o=0,u=new W;u.errHandled=function(){o++,u.parent&&u.parent.errHandled()};var a=u.fire=function(e,n){return null==u.state&&null!=e&&(u.state=!!e,u.values=I(n)?n:[n],setTimeout(function(){l(t,function(t){t()})},0)),u};l(e,function s(t,e){try{t.then?t.then(function(t){var o;(i(t)||j(t))&&j(o=t.then)?s(t,e):(u.values[e]=x(arguments),++r==n&&a(!0,2>n?u.values[e]:u.values))},function(t){u.values[e]=x(arguments),a(!1,2>n?u.values[e]:[u.values[e][0],u.values,e])}):t(function(){a(!0,x(arguments))},function(){a(!1,x(arguments))})}catch(o){a(!1,[o,u.values,e])}}),u.stop=function(){return l(e,function(t){t.stop&&t.stop()}),u.stop0&&T(u.stop0)};var c=u.then=function(e,n){var r=X(),a=function(){try{var t=u.state?e:n;j(t)?!function c(t){try{var e,n=0;if((i(t)||j(t))&&j(e=t.then)){if(t===r)throw new TypeError;e.call(t,function(t){n++||c(t)},function(t){n++||r.fire(!1,[t])}),r.stop0=t.stop}else r.fire(!0,[t])}catch(u){if(!n++&&(r.fire(!1,[u]),!o))throw u}}(T(t,G,u.values)):r.fire(u.state,u.values)}catch(a){if(r.fire(!1,[a]),!o)throw a}};return j(n)&&u.errHandled(),r.stop0=u.stop,r.parent=u,null!=u.state?setTimeout(a,0):t.push(a),r};return u.always=function(t){return c(t,t)},u.error=function(t){return c(0,t)},u}function Y(t,e){var n=this,r=0;if(t)for(var i=0,o=t.length;o>i;i++){var u=t[i];if(e&&I(u))for(var a=0,c=u.length;c>a;a++)n[r++]=u[a];else n[r++]=u}else n[r++]=e;n.length=r,n._=!0}function Z(){return new Y(arguments,!0)}var G,Q=window,tt=\"Nia\",et={},nt={},rt=1,it=/^[ic]/.test(document.readyState)?ot:[],ot=null,ut=A(\"January,February,March,April,May,June,July,August,September,October,November,December\",/,/g),at=(m(ut,t),A(\"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday\",/,/g)),ct=(m(at,t),A(\"am,pm\",/,/g),A(\"am,am,am,am,am,am,am,am,am,am,am,am,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm,pm\",/,/g),99),st={},ft=[];return h({each:S(l),find:S($),dummySort:0,select:function(t,e){return k(t,this,e)},get:function(t,e){var n=this,i=n[0];if(i){if(r(t)){var o,u=/^(\\W*)(.*)/.exec(c(t,/^%/,\"@data-\")),a=u[1];return o=nt[a]?nt[a](this,u[2]):\"$\"==t?n.get(\"className\"):\"$$\"==t?n.get(\"@style\"):\"$$slide\"==t?n.get(\"$height\"):\"$$fade\"==t||\"$$show\"==t?\"hidden\"==n.get(\"$visibility\")||\"none\"==n.get(\"$display\")?0:\"$$fade\"==t?isNaN(n.get(\"$opacity\",!0))?1:n.get(\"$opacity\",!0):1:\"$\"==a?Q.getComputedStyle(i,ot).getPropertyValue(c(u[2],/[A-Z]/g,function(t){return\"-\"+t.toLowerCase()})):\"@\"==a?i.getAttribute(u[2]):i[u[2]],e?_(o):o}var s={};return(I(t)?J:f)(t,function(t){s[t]=n.get(t,e)}),s}},set:function(t,e){var n=this;if(e!==G){var i=/^(\\W*)(.*)/.exec(c(c(t,/^\\$float$/,\"cssFloat\"),/^%/,\"@data-\")),o=i[1];et[o]?et[o](this,i[2],e):\"$$fade\"==t?this.set({$visibility:e?\"visible\":\"hidden\",$opacity:e}):\"$$slide\"==t?n.set({$visibility:e?\"visible\":\"hidden\",$overflow:\"hidden\",$height:/px/.test(e)?e:function(t,n,r){return F(k(r),e)}}):\"$$show\"==t?e?n.set({$visibility:e?\"visible\":\"hidden\",$display:\"\"}).set({$display:function(t){return\"none\"==t?\"block\":t}}):n.set({$display:\"none\"}):\"$$\"==t?n.set(\"@style\",e):J(this,function(n,r){var u=j(e)?e(k(n).get(t),r,n):e;\"$\"==o?i[2]?n.style[i[2]]=u:J(u&&u.split(/\\s+/),function(t){var e=c(t,/^[+-]/);/^\\+/.test(t)?n.classList.add(e):/^-/.test(t)?n.classList.remove(e):n.classList.toggle(e)}):\"$$scrollX\"==t?n.scroll(u,k(n).get(\"$$scrollY\")):\"$$scrollY\"==t?n.scroll(k(n).get(\"$$scrollX\"),u):\"@\"==o?u==ot?n.removeAttribute(i[2]):n.setAttribute(i[2],u):n[i[2]]=u})}else r(t)||j(t)?n.set(\"$\",t):f(t,function(t,e){n.set(t,e)});return n},add:function(t,e){return this.each(function(n,r){function i(t){if(I(t))J(t,i);else if(j(t))i(t(n,r));else if(t!=ot){var a=o(t)?t:document.createTextNode(t);u?u.parentNode.insertBefore(a,u.nextSibling):e?e(a,n,n.parentNode):n.appendChild(a),u=a}}var u;i(r&&!j(t)?K(t):t)})},on:R,trigger:function(t,e){return this.each(function(n,r){for(var i=!0,o=n;o&&i;)f(o.M,function(r,o){i=i&&o(t,e,n)}),o=o.parentNode})},ht:function(t,e){var n=arguments.length>2?v(w(arguments,1)):e;return this.set(\"innerHTML\",j(t)?t(n):/{{/.test(t)?O(t,n):/^#\\S+$/.test(t)?O(U(t).text,n):t)}},Y.prototype),h({request:function(t,n,r,i){var o,u=i||{},a=0,c=X(),s=r&&r.constructor==u.constructor;try{c.xhr=o=new XMLHttpRequest,c.stop0=function(){o.abort()},s&&(r=d(f,r,function(t,e){return d(J,e,function(e){return encodeURIComponent(t)+(e!=ot?\"=\"+encodeURIComponent(e):\"\")})}).join(\"&\")),r==ot||/post/i.test(t)||(n+=\"?\"+r,r=ot),o.open(t,n,!0,u.user,u.pass),s&&/post/i.test(t)&&o.setRequestHeader(\"Content-Type\",\"application/x-www-form-urlencoded\"),f(u.headers,function(t,e){o.setRequestHeader(t,e)}),f(u.xhr,function(t,e){o[t]=e}),o.onreadystatechange=function(){4!=o.readyState||a++||(o.status>=200&&o.status<300?c.fire(!0,[o.responseText,o]):c.fire(!1,[o.status,o.responseText,o]))},o.send(r)}catch(l){a||c.fire(!1,[0,ot,e(l)])}return c},ready:D,off:q,wait:function(t,e){var n=X(),r=setTimeout(function(){n.fire(!0,e)},t);return n.stop0=function(){n.fire(!1),clearTimeout(r)},n}},k),h({each:l,toObject:g,find:$,copyObj:h,extend:function(t){return v(w(arguments,1),t)},eachObj:f,isObject:i,format:function(t,e,n){return N(t,n)(e)},template:N,formatHtml:O,promise:X},Z),document.addEventListener(\"DOMContentLoaded\",function(){E(it),it=ot},!1),{HTML:function(){var t=P(\"div\");return Z(T(t.ht,t,arguments)[0].childNodes)},_:Z,$:k,$$:U,M:Y,getter:nt,setter:et}}()},{}]},{},[1]);</script></body></html>";

},{}],"pebble-clay":[function(require,module,exports){
'use strict';

var configPageHtml = require('./tmp/config-page.html');
var toSource = require('tosource');
var standardComponents = require('./src/scripts/components');

/**
 * @param {string} input
 * @param {string} [prefix]
 * @returns {string}
 */
function encodeDataUri(input, prefix) {
  prefix = typeof prefix !== 'undefined' ? prefix : 'data:text/html;base64,';

  if (window.btoa) {
    return prefix + encodeURIComponent(window.btoa(input));
  }

  // iOS doesn't have a window so we need to polyfil window.btoa
  // extracted from https://github.com/inexorabletash/polyfill
  var B64_ALPHABET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  input = String(input);
  var position = 0;
  var out = [];
  var o1;
  var o2;
  var o3;
  var e1;
  var e2;
  var e3;
  var e4;

  if (/[^\x00-\xFF]/.test(input)) { throw Error('InvalidCharacterError'); }

  while (position < input.length) {
    o1 = input.charCodeAt(position++);
    o2 = input.charCodeAt(position++);
    o3 = input.charCodeAt(position++);

    // 111111 112222 222233 333333
    e1 = o1 >> 2;
    e2 = ((o1 & 0x3) << 4) | (o2 >> 4);
    e3 = ((o2 & 0xf) << 2) | (o3 >> 6);
    e4 = o3 & 0x3f;

    if (position === input.length + 2) {
      e3 = 64;
      e4 = 64;
    } else if (position === input.length + 1) {
      e4 = 64;
    }

    out.push(B64_ALPHABET.charAt(e1),
             B64_ALPHABET.charAt(e2),
             B64_ALPHABET.charAt(e3),
             B64_ALPHABET.charAt(e4));
  }

  return prefix + encodeURIComponent(out.join(''));
}

/**
 * @param {Array} config - the Clay config
 * @param {function} [customFn] - custom code to run from the config page.
 * Will run with api as context
 * @constructor
 */
function Clay(config, customFn) {
  var self = this;

  self.config = config;
  self.customFn = customFn || function() {};
  self.components = [];

  /**
   * @private
   * @param {Clay~ConfigItem|Array} item
   * @return {void}
   */
  function _registerStandardComponents(item) {
    if (Array.isArray(item)) {
      item.forEach(function(item) {
        _registerStandardComponents(item);
      });
    } else if (item.type === 'section') {
      _registerStandardComponents(item.items);
    } else if (standardComponents[item.type]) {
      self.registerComponent(standardComponents[item.type]);
    }
  }

  _registerStandardComponents(self.config);
}

Clay.prototype.registerComponent = function(component) {
  this.components.push(component);
};

/**
 * Generate the Data URI used by the config Page with settings injected
 * @return {string}
 */
Clay.prototype.generateUrl = function() {
  var settings;
  var emulator = !Pebble || Pebble.platform === 'pypkjs';
  var returnTo = emulator ? '$$$RETURN_TO$$$' : 'pebblejs://close#';

  try {
    settings = JSON.parse(localStorage.getItem('clay-settings')) || {};
  } catch (e) {
    console.error(e);
    settings = {};
  }

  var compiledHtml = configPageHtml
    .replace('$$RETURN_TO$$', returnTo)
    .replace('$$CUSTOM_FN$$', toSource(this.customFn))
    .replace('$$CONFIG$$', toSource(this.config))
    .replace('$$SETTINGS$$', toSource(settings))
    .replace('$$COMPONENTS$$', toSource(this.components));

  // if we are in the emulator then we need to proxy the data via a webpage to
  // obtain the return_to.
  // @todo calculate this from the Pebble object or something
  if (emulator) {
    return encodeDataUri(
      compiledHtml,
      'http://clay.pebble.com.s3-website-us-west-2.amazonaws.com/#'
    );
  }

  return encodeDataUri(compiledHtml);
};

/**
 * Parse the response from the webviewclosed event data
 * @param {string} response
 * @returns {{}}
 */
Clay.prototype.getSettings = function(response) {
  // Decode and parse config data as JSON
  var settings = JSON.parse(decodeURIComponent(response));
  // @todo get defaults in here
  if (!settings) return {};

  localStorage.setItem('clay-settings', JSON.stringify(settings));
  return settings;
};

module.exports = Clay;

},{"./src/scripts/components":5,"./tmp/config-page.html":23,"tosource":1}]},{},["pebble-clay"])("pebble-clay")
});