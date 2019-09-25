var switcher = (function() {
    return {
        init: function(target) {
            var c, ctx;
            var width, height;
            var on_color, off_color, circle, status;
            var r;
            var border;
            var animation = false;
            
            c = document.getElementById(target);
            ctx = c.getContext("2d");

            width = c.getAttribute("width");
            height = c.getAttribute("height");

            r = height / 2;
            border  = r / 5;

            on_color = c.getAttribute("on_color");
            off_color = c.getAttribute("off_color");
            circle = c.getAttribute("circle");
            status = c.getAttribute("status");

            if (status == "on") {
                drawOn();
            } else {
                drawOff();
            }

            c.onclick = function() {
                if (!animation) {
                    if (c.getAttribute("status") == "on") {
                        drawOff();
                        c.setAttribute("status", "off");
                    } else {
                        drawOn();
                        c.setAttribute("status", "on");
                    }
                }
            }

            function drawOn() {
                animation = true;
                // 同心圆从左往右
                var x = r;
                var end = width - r;
                var handle = setInterval(function() {
                    ctx.clearRect(0, 0, width, height);

                    ctx.fillStyle = on_color;

                    ctx.beginPath();
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.fillRect(r, 0, 2 * r, 2 * r);
                    ctx.closePath();

                    ctx.fillStyle = circle;
                    ctx.beginPath();
                    ctx.arc(x, r, r - border, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    if (x == end) {
                        clearInterval(handle);
                        animation = false;
                    }

                    x ++;
                }, 50);
            }

            function drawOff() {
                animation = true;
                // 同心圆从右往左
                var x = width - r;
                var end = r;
                var handle = setInterval(function() {
                    ctx.clearRect(0, 0, width, height);

                    ctx.fillStyle = off_color;

                    ctx.beginPath();
                    ctx.arc(r, r, r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(width - r, r, r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.fillRect(r, 0, 2 * r, 2 * r);
                    ctx.closePath();

                    ctx.fillStyle = circle;
                    ctx.beginPath();
                    ctx.arc(x, r, r - border, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();

                    if (x == end) {
                        clearInterval(handle);
                        animation = false;
                    }

                    x --;
                }, 50);
            }
        }
    }
})();
