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

  const fields = fieldRepository.create([
    { form: form1, type: "TextField", column_name: "first_name" },
    { form: form1, type: "TextField", column_name: "last_name" },
    { form: form1, type: "Association", data_source: "CompanyStore", column_name: "company_id" },
  ]);
  await fieldRepository.save(fields);

  return {
    // defaultUser,
  };
}

export type Lazy<T extends object> = Promise<T> | T;
