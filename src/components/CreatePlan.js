import React, { useState, useEffect } from "react";
import { Modal, Form, DatePicker, Button, Select, message } from "antd";
import { uploadPlan } from "../utils";

const { Option } = Select;

const fetchData = async (url, setData) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
  }
};

function CreatePlan({ handleClose }) {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);

  useEffect(() => {
    fetchData("https://restcountries.com/v3.1/all", (data) => {
      const countryList = data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      setCountries(countryList);
    });
  }, []);

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    fetchData(
      `https://api.jisuapi.com/area/province?country=${value}`,
      setProvinces
    );
    setCities([]); // Reset cities when country changes
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
    fetchData(`https://api.jisuapi.com/area/city?province=${value}`, setCities);
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("start_date", values.start_date);
    formData.append("end_date", values.end_date);
    formData.append(
      "start_location",
      `${values.country}, ${values.province}, ${values.city}`
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

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please select a country!" }]}
      >
        <Select placeholder="Select a country" onChange={handleCountryChange}>
          {countries.map((country) => (
            <Option key={country.code} value={country.code}>
              {country.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Province"
        name="province"
        rules={[{ required: true, message: "Please select a province!" }]}
      >
        <Select
          placeholder="Select a province"
          onChange={handleProvinceChange}
          disabled={!selectedCountry}
        >
          {provinces.map((province) => (
            <Option key={province.id} value={province.name}>
              {province.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: "Please select a city!" }]}
      >
        <Select placeholder="Select a city" disabled={!selectedProvince}>
          {cities.map((city) => (
            <Option key={city.id} value={city.name}>
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
}

export default CreatePlan;
