function nio2() {

var socket = io();

nio.source.socketio(
 '//brand.nioinstances.com',
 ['crystal_mobile_data', 'crystal_global_shake_count']).pipe(nio.log());


}
