var AWS = require('aws-sdk');
var EC = new AWS.EC2();
console.log('starting function')

exports.handle = function(event, ctx, cb) {
  var params = {
    Resources: [],
    Tags: [
      {
        Key: "Project",
        Value: "offgrid"
      }
    ]
  }
  console.log('processing event: %j', event)
  var volume = 'arn:aws:ec2::' + process.env.AWS_REGION + ':volume/' + process.env.VOLUME_SOURCE;
  console.log('volume source: %', volume);

  if (event.detail.event === 'createSnapshot' && event.detail.source === volume) {
    var snapshot_id = event.detail.snapshot_id;
    params.Resources = [snapshot_id.split('/')[1]]; //Take the id from the ARN
    EC.createTags(params, function (err, data) {
      if (err) {
        console.log('create tags failed on %', snapshot_id)
        cb(err);
      } else {
        console.log('create tags succeeded on %', snapshot_id)
        cb(null, data);
      }
    })
  }
}
