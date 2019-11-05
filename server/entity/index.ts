import { getRepository } from "typeorm";

import { Form } from "./Form";
import { Field } from "./Field";
import { Company } from "./Company"

export async function seedDatabase() {
  const formRepository = getRepository(Form);
  const fieldRepository = getRepository(Field);
  const companyRepository = getRepository(Company);

  await fieldRepository.delete({});
  await formRepository.delete({});
  await companyRepository.delete({});

  const companies = companyRepository.create([
    { name: "Acme Trees" },
    { name: "Google" },
    { name: "Heavy Objects" },
  ]);
  await companyRepository.save(companies);

  // const [form1] = formRepository.create([
  //   {
  //     table_name: "people",
  //     name: "People Form",
  //   },
  // ]);
  const form1 = new Form();
  form1.table_name = "people";
  form1.name = "People Form";
  await formRepository.save([form1]);

  const fields1 = fieldRepository.create([
    { form: form1, type: "Text", column_name: "first_name" },
    { form: form1, type: "Text", column_name: "last_name" },
    { form: form1, type: "Association", data_source: "CompanyStore", column_name: "company_id" },
    { form: form1, type: "Association", data_source: "PersonStore", column_name: "doctor_id" },
  ]);
  await fieldRepository.save(fields1);

  const form2 = new Form();
  form2.table_name = "companies";
  form2.name = "Company Form";
  await formRepository.save([form2]);

  const fields2 = fieldRepository.create([
    { form: form2, type: "Text", column_name: "name" },
  ]);
  await fieldRepository.save(fields2);

  return {
    // defaultUser,
  };
}

export type Lazy<T extends object> = Promise<T> | T;
