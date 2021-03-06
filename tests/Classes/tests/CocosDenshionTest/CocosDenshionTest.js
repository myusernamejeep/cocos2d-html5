/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var MUSIC_FILE = "Resources/background";
var EFFECT_FILE = "Resources/effect2";

var DenshionTests = [
    {
        title:"playBackgroundMusic",
        playFunc:function () {
            return new playBackgroundMusic();
        }
    },
    {
        title:"stopBackgroundMusic",
        playFunc:function () {
            return new stopBackgroundMusic();
        }
    },
    {
        title:"pauseBackgroundMusic",
        playFunc:function () {
            return new pauseBackgroundMusic();
        }
    },
    {
        title:"resumeBackgroundMusic",
        playFunc:function () {
            return new resumeBackgroundMusic();
        }
    },
    {
        title:"rewindBackgroundMusic",
        playFunc:function () {
            return new rewindBackgroundMusic();
        }
    },
    {
        title:"isBackgroundMusicPlaying",
        playFunc:function () {
            return new isBackgroundMusicPlaying();
        }
    },
    {
        title:"playEffect",
        playFunc:function () {
            return new playEffect();
        }
    },
    {
        title:"playEffectRepeatly",
        playFunc:function () {
            return new playEffectRepeatly();
        }
    },
    {
        title:"stopEffect",
        playFunc:function () {
            return new stopEffect();
        }
    },
    {
        title:"unloadEffect",
        playFunc:function () {
            return new unloadEffect();
        }
    },
    {
        title:"addBackgroundMusicVolume",
        playFunc:function () {
            return new addBackgroundMusicVolume();
        }
    },

    {
        title:"subBackgroundMusicVolume",
        playFunc:function () {
            return new subBackgroundMusicVolume();
        }
    },

    {
        title:"addEffectsVolume",
        playFunc:function () {
            return new addEffectsVolume();
        }
    },

    {
        title:"subEffectsVolume",
        playFunc:function () {
            return new subEffectsVolume();
        }
    },

    {
        title:"pauseEffect",
        playFunc:function () {
            return new pauseEffect();
        }
    },

    {
        title:"resumeEffect",
        playFunc:function () {
            return new resumeEffect();
        }
    },

    {
        title:"pauseAllEffects",
        playFunc:function () {
            return new pauseAllEffects();
        }
    },

    {
        title:"resumeAllEffects",
        playFunc:function () {
            return new resumeAllEffects();
        }
    },

    {
        title:"stopAllEffects",
        playFunc:function () {
            return new stopAllEffects();
        }
    }

];

CocosDenshionTest = cc.Layer.extend({
    _itmeMenu:null,
    _beginPos:cc.PointZero(),
    isMouseDown:false,
    _testCount:0,
    ctor:function () {
        // add menu items for tests
        this._itmeMenu = cc.Menu.create(null);
        var s = cc.Director.sharedDirector().getWinSize();
        for (var i = 0; i < DenshionTests.length; i++) {
            var label = cc.LabelTTF.create(DenshionTests[i].title, "Arial", 24);
            var menuItem = cc.MenuItemLabel.create(label, this, this.menuCallback);
            this._itmeMenu.addChild(menuItem, i + 10000);
            menuItem.setPosition(cc.PointMake(s.width / 2, (s.height - (i + 1) * LINE_SPACE)));
        }
        this._testCount = i;
        this._itmeMenu.setContentSize(cc.SizeMake(s.width, (this._testCount + 1) * LINE_SPACE));
        this._itmeMenu.setPosition(cc.PointZero());
        this.addChild(this._itmeMenu);

        this.setTouchEnabled(true);

        // set default volume
        cc.AudioManager.sharedEngine().setEffectsVolume(0.5);
        cc.AudioManager.sharedEngine().setBackgroundMusicVolume(0.5);
    },
    menuCallback:function (sender) {
        var idx = sender.getZOrder() - 10000;
        // create the test scene and run it
        var scene = DenshionTests[idx].playFunc();
    },
    ccTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            var touchLocation = touches[0].locationInView(0);
            var nMoveY = touchLocation.y - this._beginPos.y;
            var curPos = this._itmeMenu.getPosition();

            var nextPos = cc.ccp(curPos.x, curPos.y + nMoveY);
            var winSize = cc.Director.sharedDirector().getWinSize();
            if (nextPos.y < 0.0) {
                this._itmeMenu.setPosition(cc.PointZero());
                return;
            }

            if (nextPos.y > ((this._testCount + 1) * LINE_SPACE - winSize.height)) {
                this._itmeMenu.setPosition(cc.ccp(0, ((this._testCount + 1) * LINE_SPACE - winSize.height)));
                return;
            }

            this._itmeMenu.setPosition(nextPos);

            this._beginPos = cc.ccp(0, touchLocation.y);
        }
    },
    ccTouchesBegan:function (touches, event) {
        if (!this.isMouseDown) {
            this._beginPos = touches[0].locationInView(0);
        }
        this.isMouseDown = true;
    },
    ccTouchesEnded:function () {
        this.isMouseDown = false;
    },
    onExit:function () {
        this._super();
        cc.AudioManager.sharedEngine().end();
    }
});

CocosDenshionTestScene = TestScene.extend({
    runThisTest:function () {
        var layer = new CocosDenshionTest();
        this.addChild(layer);
        cc.Director.sharedDirector().replaceScene(this);
    }
});

var soundId = null;

var playBackgroundMusic = function () {
    cc.Log("play background music");
    cc.AudioManager.sharedEngine().playBackgroundMusic(MUSIC_FILE, false);
};

var stopBackgroundMusic = function () {
    cc.Log("stop background music");
    cc.AudioManager.sharedEngine().stopBackgroundMusic();
};

var pauseBackgroundMusic = function () {
    cc.Log("pause background music");
    cc.AudioManager.sharedEngine().pauseBackgroundMusic();
};

var resumeBackgroundMusic = function () {
    cc.Log("resume background music");
    cc.AudioManager.sharedEngine().resumeBackgroundMusic();
};

var rewindBackgroundMusic = function () {
    cc.Log("rewind background music");
    cc.AudioManager.sharedEngine().rewindBackgroundMusic();
};

// is background music playing
var isBackgroundMusicPlaying = function () {
    if (cc.AudioManager.sharedEngine().isBackgroundMusicPlaying()) {
        cc.Log("background music is playing");
    }
    else {
        cc.Log("background music is not playing");
    }
};

var playEffect = function () {
    cc.Log("play effect");
    soundId = cc.AudioManager.sharedEngine().playEffect(EFFECT_FILE);
};

var playEffectRepeatly = function () {
    cc.Log("play effect repeatly");
    soundId = cc.AudioManager.sharedEngine().playEffect(EFFECT_FILE, true);
};

var stopEffect = function () {
    cc.Log("stop effect");
    cc.AudioManager.sharedEngine().stopEffect(soundId);
};

var unloadEffect = function () {
    cc.Log("unload effect");
    cc.AudioManager.sharedEngine().unloadEffect(EFFECT_FILE);
};

var addBackgroundMusicVolume = function () {
    cc.Log("add bakcground music volume");
    cc.AudioManager.sharedEngine().setBackgroundMusicVolume(cc.AudioManager.sharedEngine().getBackgroundMusicVolume() + 0.1);
};

var subBackgroundMusicVolume = function () {
    cc.Log("sub backgroud music volume");
    cc.AudioManager.sharedEngine().setBackgroundMusicVolume(cc.AudioManager.sharedEngine().getBackgroundMusicVolume() - 0.1);
};

var addEffectsVolume = function () {
    cc.Log("add effects volume");
    cc.AudioManager.sharedEngine().setEffectsVolume(cc.AudioManager.sharedEngine().getEffectsVolume() + 0.1);
};

var subEffectsVolume = function () {
    cc.Log("sub effects volume");
    cc.AudioManager.sharedEngine().setEffectsVolume(cc.AudioManager.sharedEngine().getEffectsVolume() - 0.1);
};

var pauseEffect = function () {
    cc.Log("pause effect");
    cc.AudioManager.sharedEngine().pauseEffect(soundId);
};

var resumeEffect = function () {
    cc.Log("resume effect");
    cc.AudioManager.sharedEngine().resumeEffect(soundId);
};

var pauseAllEffects = function () {
    cc.Log("pause all effects");
    cc.AudioManager.sharedEngine().pauseAllEffects();
};
var resumeAllEffects = function () {
    cc.Log("resume all effects");
    cc.AudioManager.sharedEngine().resumeAllEffects();
};
var stopAllEffects = function () {
    cc.Log("stop all effects");
    cc.AudioManager.sharedEngine().stopAllEffects();
};