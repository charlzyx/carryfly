var utils = (function() {
    var checker = function(str, type, tip) {
        switch (type) {
            case "phone":
                var rs = /^1[3|4|5|7|8]\d{9}$/.test(str);
                return rs;
            case "pwd":
                var rs = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,15}$/.test(str);
                return rs;
            case "unblank":
                var rs = !/^\s*$/g.test(str);
                return rs;
            case "enum":
                var rs = /^[_a-zA-Z0-9]+$/.test(str);
                return rs;
            case "vecode":
                var rs = /^\d{n}$/.test(str);
                return rs;
        }
    }

    return {
        veach: function() {
            var result = true;
            $('xcForm [vtype]').each(function() {
                var rs = checker($(this).val() || $(this).html(), $(this).attr("vtype"));
                result = result && rs;
                console.log([$(this).val(), $(this).attr("vtype"), rs])
            });
            return result;
        }
    }
})();
