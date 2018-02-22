(function () {
    var Player = function (name, className) {
        this.name = name;
        this.className = className;
    };
    function getResult(cell) {
        return cell.children.length === 0 ? -1 :
                ($(cell).find('div').hasClass(morpion.players[0].className) ? 0 : 1);
    }
    ;
    var gameOverFn = () => {
        var data = [
            [], [], []
        ];
        $('table tr').each((i, line) => {//i correspond aux lignes
            $(line).find('td').each((j, cell) => {//j correspond aux colonnes
                data[i][j] = getResult(cell);
            });
        });
        console.log(data);

        var won = false;
        //Lignes
        won = won || data[0][0] > -1
                && data[0][0] === data[0][1] && data[0][0] === data[0][2];
        won = won || data[1][0] > -1
                && data[1][0] === data[1][1] && data[1][0] === data[1][2];
        won = won || data[2][0] > -1
                && data[2][0] === data[2][1] && data[2][0] === data[2][2];
        //Colonnes
        won = won || data[0][0] > -1
                && data[0][0] === data[1][0] && data[0][0] === data[2][0];
        won = won || data[0][1] > -1
                && data[0][1] === data[1][1] && data[0][1] === data[2][1];
        won = won || data[0][2] > -1
                && data[0][2] === data[1][2] && data[0][2] === data[2][2];
        //Diagonales
        won = won || data[0][0] > -1
                && data[0][0] === data[1][1] && data[0][0] === data[2][2];
        won = won || data[0][2] > -1
                && data[0][2] === data[1][1] && data[0][2] === data[2][0];
        return won;
    };

    var play = (event) => {//le => correspond a function()
        var element = event.target || event.currentTarget;
        console.info('clic sur', element);
        var className = morpion.players[morpion.currentPlayer].className;
        var symbol = $('<div class="' + className + '"<div/>');
        var jElement = $(element);
        jElement.append(symbol);
        jElement.unbind('click');
        if (!morpion.gameOver()) {

            //joueur suivant
            morpion.next();
            morpion.displayCurrentPlayer();
        } else {
            var winner = morpion.players[morpion.currentPlayer].name;
            $('td').unbind();
            var results = $('#results');
            results.append($('<h1>Victoire de ' + winner + '</h1>'));
            results.show();
            $('table').hide();
        }

    };
    var displayCurrentPlayerFn = () => {
        morpion.players.forEach((player, index) => {
            var span = $('header span.player' + index);
            span.removeClass(player.className);
        });
        var currentPlayer = morpion.players[morpion.currentPlayer];
        $('header span.player' + morpion.currentPlayer).addClass(currentPlayer.className);
    };

    var initFn = function () {
        console.log('initialisation du morpion!');
        $('td').click(play);
        morpion.displayCurrentPlayer();
    };


    var resetFn = function () {
        morpion.next();
        morpion.init();
        $('td').empty();
        $('table').show();
        $('#results').emtpy().hide();
    };

    var morpion = {
        players: [
            new Player('Joueur 1', 'red'),
            new Player('Joueur 2', 'blue')
        ],
        currentPlayer: 0,
        displayCurrentPlayer: displayCurrentPlayerFn,
        init: initFn,
        reset: resetFn,
        gameOver: gameOverFn,
        next: function () {
            morpion.currentPlayer = ++morpion.currentPlayer % morpion.players.length;
        }
    };

    window.morpion = morpion;
    $(document).ready(() => {
        window.morpion.init();
    });
})();