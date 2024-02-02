import { useState } from "react";
import UiButton from "../shared/ui/ui-button";
import UiSelect from "../shared/ui/ui-select";
import UiSpinner from "../shared/ui/ui-spinner";
import UiTextField from "../shared/ui/ui-text-field";
import { SplitViewLayout } from "../shared/ui/layouts/split-view";

const HomePage = () => {
  const options = [
    {
      label: "Russia",
      id: "1",
    },
    {
      label: "USA",
      id: "2",
      disabled: true,
    },
    { label: "China", id: "3" },
  ];

  const [selected, setSelected] = useState(options[0]);

  console.log(selected);

  return (
    <SplitViewLayout
      right={
        <form action="" className="flex flex-col gap-1">
          <UiTextField
            error="This is an error"
            label="Email"
            inputProps={{ placeholder: "example@gmail.com", type: "email" }}
          />
          <UiTextField
            label="Password"
            inputProps={{ placeholder: "******", type: "password" }}
          />
        </form>
      }
      left={
        <div className="flex w-72 flex-col gap-2 p-4">
          <UiButton variant="primary">Primary</UiButton>
          <UiButton variant="danger">Danger</UiButton>
          <UiButton variant="success">Success</UiButton>
          <UiButton variant="warning">Warning</UiButton>
          <UiButton variant="neutral">Neutral</UiButton>
          <UiSpinner />
          <UiSelect options={options} value={selected} onChange={setSelected} />
        </div>
      }
    />
  );
};

export default HomePage;
