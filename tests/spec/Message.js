/*
 goatstone.test.components.Message
 * */

describe("Message", function () {
    var message;

    beforeEach(function () {
        message = new Message();
    });

    describe("when a message is set", function () {

        it("should display the message to the user", function () {

            var msg = "msg";
            var displayMsg;

            message.set(msg);
            displayMsg = message.$root.querySelector('#message-main').innerText

            expect(msg).toEqual(displayMsg);

        });

    });
});
