import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";

const PersonalDetails = () => {
  const form = useForm();
  const [isDisabled, setIsDisabled] = useState(true);
  const onSubmit = () => {};
  return (
    <div className="space-y-5">
      <Card className="p-1 md:p-4">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled} type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled} type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isDisabled} type="email" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-start justify-end">
                {isDisabled ? (
                  <>
                    <Button type="button" onClick={() => setIsDisabled(false)}>
                      Edit profile
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit">Save Changes</Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="p-1 md:p-4">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            You will lose access to your BookMe account once your deletion
            request has been submitted.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-start justify-end">
          <Button variant={"destructive"}>Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetails;
