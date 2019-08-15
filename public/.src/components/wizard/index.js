import ForceAlarmWizard from "./wizard";
import StepView from "./stepView";
import PropertySize from "./propertySizeStep";
import SelectPlan from "./selectPlanStep";
import SelectAddons from "./selectAddonStep";
import PersonalDataForm from "./personalDataStep";
import PaymentDataForm from "./paymentDataStep";
import OrderCompleted from "./completedStep";

export {
    StepView,
    PropertySize as Step1,
    SelectPlan as Step2,
    SelectAddons as Step3,
    PersonalDataForm as Step4,
    PaymentDataForm as Step5,
    OrderCompleted as Step6
};

export default ForceAlarmWizard;