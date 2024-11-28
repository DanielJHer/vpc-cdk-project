import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Props
interface EC2StackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EC2StackProps) {
    super(scope, id, props);

    // 1st Private EC2 Instance
    const privateinstance1 = new ec2.Instance(this, 'MyFirstPrivateEC2-AZ1', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        availabilityZones: [props.vpc.availabilityZones[0]],
      },
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
    });

    // 2nd Private EC2 Instnace
    const privateinstance2 = new ec2.Instance(this, 'MySecondPrivateEC2-AZ2', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        availabilityZones: [props.vpc.availabilityZones[1]],
      },
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
    });

    cdk.Tags.of(privateinstance1).add('Name', 'MyFirstPrivateEC2');
    cdk.Tags.of(privateinstance2).add('Name', 'MySecondPrivateEC2');
  }
}
