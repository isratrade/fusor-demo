import Ember from 'ember';
import NeedsDeploymentNewMixin from "../../../mixins/needs-deployment-new-mixin";

export default Ember.Controller.extend(NeedsDeploymentNewMixin, {

  deploymentNewSatelliteController: Ember.inject.controller('deployment-new/satellite'),
  deploymentNewController: Ember.inject.controller('deployment-new'),

  name: Ember.computed.alias("deploymentNewController.name"),
  description: Ember.computed.alias("deploymentNewController.description"),

  organizationTabRouteName: Ember.computed.alias("deploymentNewSatelliteController.organizationTabRouteName"),

  disableNextOnDeploymentName: Ember.computed.alias("deploymentNewController.disableNextOnDeploymentName"),

  idSatName: 'deployment_new_sat_name',
  idSatDesc: 'deployment_new_sat_desc',

  backRouteNameOnSatIndex: 'deployment-new.start',

  deploymentNames: Ember.computed.alias("applicationController.deploymentNames")

});
