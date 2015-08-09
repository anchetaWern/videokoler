(function(){
	angular.module('starter')
	.controller('CallController', ['localStorageService', '$scope', '$ionicPopup', CallController]);
	
	function CallController(localStorageService, $scope, $ionicPopup){

			$scope.username = localStorageService.get('username');



			var peer = new Peer($scope.username, {
				key: 'your peerserver cloud key',
				config: {'iceServers': [
		            { url: 'stun:stun1.l.google.com:19302' },
		            { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
        		]}
			});

			function getVideo(successCallback, errorCallback){
			    navigator.webkitGetUserMedia({audio: true, video: true}, successCallback, errorCallback);
			}


			function onReceiveCall(call){

				$ionicPopup.alert({
					title: 'Incoming Call',
					template: 'Someone is calling you. Connecting now..'
				});

			    getVideo(
			        function(MediaStream){
			            call.answer(MediaStream);
			        },
			        function(err){
			            $ionicPopup.alert({
				        	title: 'Error',
				        	template: 'An error occured while try to connect to the device mic and camera'
				        });
			        }
			    );

			    call.on('stream', onReceiveStream);
			}


			function onReceiveStream(stream){
			    var video = document.getElementById('contact-video');
			    video.src = window.URL.createObjectURL(stream);
			    video.onloadedmetadata = function(){
					$ionicPopup.alert({
						title: 'Call Ongoing',
						template: 'Call has started. You can speak now'
					});
			    };

			}

			$scope.startCall = function(){
				var contact_username = $scope.contact_username;
		
				getVideo(
				    function(MediaStream){

				        var call = peer.call(contact_username, MediaStream);
				        call.on('stream', onReceiveStream);
				    },
				    function(err){
				        $ionicPopup.alert({
				        	title: 'Error',
				        	template: 'An error occured while try to connect to the device mic and camera'
				        });
				    }
				);

			};

			peer.on('call', onReceiveCall);



	}

})();