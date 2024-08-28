import React, { useState, useEffect } from "react";
import { Form, Button, Select, DatePicker, message } from "antd";
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { uploadPlan } from "../utils";

const { Option } = Select;

const CountryStateCityForm = ({ handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("start_date", values.start_date);
    formData.append("end_date", values.end_date);
    formData.append(
      "start_location",
      `${values.country}, ${values.state}, ${values.city}`
    );

    setLoading(true);
    try {
      await uploadPlan(formData);
      message.success("Upload successfully");
      handleClose();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const countryList = await GetCountries();
      setCountries(countryList);
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (value) => {
    setSelectedCountry(value);
    setSelectedState(null);
    setCities([]);

    const stateList = await GetState(value);
    setStates(stateList);
  };

  const handleStateChange = async (value) => {
    setSelectedState(value);

    const cityList = await GetCity(selectedCountry, value);
    setCities(cityList);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please select a country!" }]}
      >
        <Select
          placeholder="Select a country"
          onChange={handleCountryChange}
          allowClear
          style={{ width: "100%" }}
        >
          {countries.map((country) => (
            <Option key={country.id} value={country.id}>
              {country.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="State"
        name="state"
        rules={[{ required: true, message: "Please select a state!" }]}
      >
        <Select
          placeholder="Select a state"
          onChange={handleStateChange}
          allowClear
          disabled={!selectedCountry}
          style={{ width: "100%" }}
        >
          {states.map((state) => (
            <Option key={state.id} value={state.id}>
              {state.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please select a city!" }]}
      >
        <Select
          placeholder="Select a city"
          allowClear
          disabled={!selectedState}
          style={{ width: "100%" }}
        >
          {cities.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Start Date"
        name="start_date"
        rules={[{ required: true, message: "Please select a start date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="End Date"
        name="end_date"
        rules={[{ required: true, message: "Please select an end date!" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CountryStateCityForm;
