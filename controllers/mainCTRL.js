var vpoll = angular.module('vpoll',[]);
vpoll.controller("mainCTRL", ['$http', '$scope', function(http, sc){

    sc.pollsList = [];
    sc.todayPoll = {};

    /* Calling Get List of polls at the page init*/
    (listAllPolls = async ()=>{
        try{
            $('#waiting').show();
            let serverResponse = await sendServerRequest(apiMainURL+getAllPolls,"GET");
            if ( serverResponse ){
                if ( serverResponse.hasOwnProperty('status') ){
                    if ( serverResponse.status==200 ){
                        sc.pollsList = serverResponse.data;
                        if ( sc.pollsList.length===0 ){
                        	$('#no-record-dialog').show();
							$('#content').hide();
						} else{
                            sc.todayPoll = sc.pollsList[0];
                            sc.pollsList.splice(0, 1);
                        }
                        sc.$digest();
                    } else {
                        swal({
                            title: "Oops",
                            text: serverResponse.detail,
                            icon: "error",
                            button: "Close",
                        });
                    }
                }
                else throw 'Invalid server response';
            }
            else throw 'No response by server';

        }
        catch (e) {
            swal({
                title: "Oops",
                text: "Something not right",
                icon: "error",
                button: "Close",
            });
        }
        finally {
            $('#waiting').hide();
        }
    })();

    sc.submitVote = async (value)=>{
        try{
            if ( value==1 || value ==0){
                $('#waiting').show();
                let serverResponse = await sendServerRequest(apiMainURL+submitVote+`?vote=${value}&questionId=${sc.pollsList[0].id}`,"GET");
                if ( serverResponse ){
                    if ( serverResponse.hasOwnProperty('status') ){
                        if ( serverResponse.status==200 ){
                            swal({
                                title: "Submitted",
                                text: serverResponse.detail,
                                icon: "success",
                                button: "Close",
                            });
                            setTimeout(()=>{ window.location.reload() },1000);
                        } else {
                            swal({
                                title: "Oops",
                                text: serverResponse.detail,
                                icon: "error",
                                button: "Close",
                            });
                        }
                    }
                    else throw 'Invalid server response';
                }
                else throw 'No response by server';

            }
        }
        catch (e) {
            swal({
                title: "Oops",
                text: "Something not right",
                icon: "error",
                button: "Close",
            });
        }
        finally {
            $('#waiting').hide();
        }
    };

}]);
