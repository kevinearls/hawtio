/**
 * @module Editor
 */
module Editor {

    export function TodoCtrl($scope) {
        $scope.todos = [
            {text: 'learn angular', done: true},
            {text: 'build an angular app', done: false}
        ];

        $scope.addTodo = function () {
            $scope.todos.push({text: $scope.todoText, done: false});
            $scope.todoText = '';
        };

        $scope.remaining = function () {
            var count = 0;
            angular.forEach($scope.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function () {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
    }

    export function RenderCtrl($scope) {

        // The Themes
        $scope.themes = ['chrome', 'twilight', 'terminal', 'solarized_dark', 'solarized_light','textmate'];
        $scope.theme = $scope.themes[3];

        /**
         * Define Post processor to change html generated with asciidoc
         * @param  {angular.element} element [description]
         * @return {html} html updated
         */
        var urlImages = 'https://raw2.github.com/asciidoctor/asciidoctor.js/master/examples/';
        var urlLink = 'https://github.com/Nikku/asciidoc-samples/blob/master/';

        $scope.asciiPostProcessor = function(element) {
            element.find('a').not('[href^="http"]').each(function() {
                var el = angular.element(this)
                var href = el.attr('href');
                el.attr('href', urlLink+href)
            });
            element.find('img').not('[src^="http"]').each(function() {
                var el = angular.element(this);
                var srcImg = el.attr('src');
                el.attr('src',  urlImages+srcImg);
            });
            return element;
        }

        // The ui-ace option
        $scope.aceOption = {
            mode:     'asciidoc',
            theme:    $scope.theme.toLowerCase(),
            fontsize: '16px',
            onLoad: function (acee) {
                $scope.themeChanged = function () {
                    acee.setTheme('ace/theme/' + $scope.theme.toLowerCase());
                };
            }
        };

        $scope.ascii=  '== Write some text or drop an AsciiDoc file in editor area\n';
        $scope.ascii+= '== <-';


        $scope.onDragOver = function (event) {
            console.log(event);
        };

        $scope.onDragEnter = function (event) {
            console.log(event);
        };

        $scope.onDragLeave = function (event) {
            console.log(event);
        };
    }

    export function AceCtrl($scope) {

        // The modes
        $scope.modes = ['Scheme', 'XML', 'Javascript'];
        $scope.mode = $scope.modes[0];


        // The ui-ace option
        $scope.aceOption = {
            mode: $scope.mode.toLowerCase(),
            onLoad: function (_ace) {

                // HACK to have the ace instance in the scope...
                $scope.modeChanged = function () {
                    _ace.getSession().setMode("ace/mode/" + $scope.mode.toLowerCase());
                };

            }
        };

        // Initial code content...
        $scope.aceModel = ';; Scheme code in here.\n' +
            '(define (double x)\n\t(* x x))\n\n\n' +
            '<!-- XML code in here. -->\n' +
            '<root>\n\t<foo>\n\t</foo>\n\t<bar/>\n</root>\n\n\n' +
            '// Javascript code in here.\n' +
            'function foo(msg) {\n\tvar r = Math.random();\n\treturn "" + r + " : " + msg;\n}';

    }


}
