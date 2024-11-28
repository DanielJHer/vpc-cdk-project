import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { VpcSubnetGroupType } from 'aws-cdk-lib/cx-api';

interface RDSStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class RDSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: RDSStackProps) {
    super(scope, id, props);

    const RDSInstance1 = new rds.DatabaseInstance(this, 'RDSInstance1', {
      vpc: props.vpc,
      vpcSubnets: {
        subnetGroupName: 'Database',
      },
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      allocatedStorage: 20,
      maxAllocatedStorage: 30,
      storageType: rds.StorageType.GP2,
    });

    cdk.Tags.of(RDSInstance1).add('Name', 'RDSInstance');
  }
}
