function nio2() {

// var socket = io();

nio.source.socketio(
 'http://brand.nioinstances.com',
 ['crystal_mobile_data', 'crystal_global_shake_count']).pipe(nio.log());

// nio.source.generate({
//    test_a: 1,
//    test_b: 2
// }).pipe(nio.pass(function(chunk) {
//    console.log("My value is " + chunk.test_a);
// }));

// nio.source.generate({data:'longitude',maxTimes: 1,rate: 100});

// nio.source.generate(function(iter) {
//  return {longitude: iter};
// }, 3).pipe(nio.log("output"));

// nio.has('longitude');

// nio.source.generate({
//    test_a: 1,
//    test_b: 2
// }).pipe(nio.pass(function(chunk) {
//    console.log("My value is " + chunk.test_a);
// }));


// nio.source.generate({val: 1})
//  .pipe(nio.log("output"));

}
