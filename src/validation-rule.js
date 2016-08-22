export class ValidationRule {
  name = '';
  config;
  constructor(name, config) {
    this.name = name;
    this.config = config;
  }
  static date(config = true) {
    return new ValidationRule('date', config);
  }
  static datetime(config = true) {
    return new ValidationRule('datetime', config);
  }
  static email(config = true) {
    return new ValidationRule('email', config);
  }
  static equality(config) {
    return new ValidationRule('equality', config);
  }
  static exclusion(config) {
    return new ValidationRule('exclusion', config);
  }
  static format(config) {
    return new ValidationRule('format', config);
  }
  static inclusion(config) {
    return new ValidationRule('inclusion', config);
  }
  static lengthRule(config) {
    return new ValidationRule('length', config);
  }
  static numericality(config = true) {
    return new ValidationRule('numericality', config);
  }
  static presence(config = true) {
    return new ValidationRule('presence', config);
  }
  static url(config = true) {
    return new ValidationRule('url', config);
  }
  static registerCustomValidationRule(config = true)
  {
    let ruleName = config.ruleName;
    let rule = config.rule;
    //add the rule to validate.js
    validate.validators[ruleName] = rule;
    //add the wrapper for the rule to ValidationRule so we can instantiate an instance of it (as a ValidationRule object)
    ValidationRule[ruleName] = function(config)
    {
        return new ValidationRule(ruleName, config);
    }
    //add a wrapper so we can associate the rule as a validator for a field for 
    ValidationRules[ruleName] = function(config)
    {
        this.addRule(this.currentProperty, ValidationRule[ruleName](config));
        return this;
    };

    return new ValidationRule(ruleName, config.config||true);
  }
}

export function cleanResult(data) {
  let result = {};
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      result = {
        propertyName: prop,
        message: data[prop][0]
      };
    }
  }
  return result;
}
