var Obj;

Obj = {
    circle: new Array(80),
    radius: 425,
    noise: 100,
    speed: 0.5,
    size: 500,
    color: {
        a: 'hsla(280, 95%, 0%, 0.5)',
        b: 'hsla(255, 255%, 255%, 0.6)'
    },
    X: function(x) {
        return Obj.c.width / 2 + x;
    },
    Y: function(y) {
        return Obj.c.height / 2 - y;
    },
    Circle: function(i) {
        this.r = Obj.radius - (i * Obj.radius / Obj.circle.length);
        this.e = i % 2 ? true : false;
        this.max = Math.random() * Obj.noise;
        this.min = -Math.random() * Obj.noise;
        this.val = Math.random() * (this.max - this.min) + this.min;
    },
    Clear: function() {
        Obj.$.fillStyle = Obj.color.a;
        Obj.$.fillRect(0, 0, Obj.c.width, Obj.c.height);
    },
    Change: function(C) {
        var a, i, x, y;
        i = 0;
        while (i < Obj.size) {
            a = i * Math.PI * 2 / Obj.size;
            x = Math.cos(a) * (C.r - (C.val * Math.cos(i / 4)));
            y = Math.sin(a) * (C.r - (C.val * Math.cos(i / 4)));
            Obj.$.fillStyle = Obj.color.b;
            Obj.$.fillRect(Obj.X(x), Obj.Y(y), 1, 1);
            i++;
            i++;
            i++;
        }
        Obj.Check(C);
    },
    Check: function(C) {
        C.val = C.e ? C.val + Obj.speed : C.val - Obj.speed;
        if (C.val < C.min) {
            C.e = true;
            C.max = Math.random() * Obj.noise;
        }
        if (C.val > C.max) {
            C.e = false;
            C.min = -Math.random() * Obj.noise;
        }
    },
    Update: function() {
        var i;
        Obj.Clear();
        i = 0;
        while (i < Obj.circle.length) {
            Obj.Change(Obj.circle[i]);
            i++;
        }
    },
    Draw: function() {
        Obj.Update();
        window.requestAnimationFrame(Obj.Draw, Obj.c);
    },
    Set: function() {
        var i;
        i = 0;
        while (i < Obj.circle.length) {
            Obj.circle[i] = new Obj.Circle(i);
            i++;
        }
    },
    Size: function() {
        Obj.c.width = window.innerWidth;
        Obj.c.height = window.innerHeight;
    },
    Resize: function() {
        Obj.c.width = window.innerWidth;
        Obj.c.height = window.innerHeight;
        Obj.Draw();
    },
    Run: function() {
        Obj.c = document.querySelector('canvas');
        Obj.$ = Obj.c.getContext('2d');
    },
    Init: function() {
        Obj.Run();
        Obj.Size();
        Obj.Set();
        Obj.Draw();
    }
};

$(function() {
    Obj.Init();
    return window.addEventListener('resize', Obj.Size(), false);
});