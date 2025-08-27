import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema } from "@shared/schema";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { InsertContactMessage } from "@shared/schema";
import { z } from "zod";

const formSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContactMessage) => apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
      });
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4" data-testid="text-contact-title">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-lg" data-testid="text-contact-subtitle">
              We'd love to connect with you. Reach out with any questions or to learn more about our community.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6" data-testid="text-contact-info-title">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground" data-testid="text-church-address">
                        123 Grace Street<br>
                        Community City, CC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground" data-testid="text-church-phone">
                        (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground" data-testid="text-church-email">
                        info@gracecommunity.org
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-lg">
                      <Clock className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Office Hours</h3>
                      <p className="text-muted-foreground" data-testid="text-office-hours">
                        Monday - Friday: 9:00 AM - 5:00 PM<br>
                        Saturday: 9:00 AM - 1:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-foreground mb-6" data-testid="text-contact-form-title">
                  Send us a Message
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-subject">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general" data-testid="option-general">General Inquiry</SelectItem>
                              <SelectItem value="prayer" data-testid="option-prayer">Prayer Request</SelectItem>
                              <SelectItem value="ministry" data-testid="option-ministry">Ministry Information</SelectItem>
                              <SelectItem value="visit" data-testid="option-visit">Planning a Visit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="How can we help you?"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={contactMutation.isPending}
                      data-testid="button-send-message"
                    >
                      {contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="shadow-lg mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-visit-title">
                Planning to Visit?
              </h2>
              <p className="text-muted-foreground mb-6" data-testid="text-visit-content">
                We'd love to have you join us for worship! No need to dress up or bring anything special - 
                just come as you are. If you have any questions about what to expect, parking, or childcare, 
                don't hesitate to reach out.
              </p>
              <div className="text-sm text-muted-foreground">
                <p data-testid="text-service-reminder">
                  Sunday Services: 9:00 AM & 11:00 AM
                </p>
                <p data-testid="text-parking-info">
                  Free parking available on-site
                </p>
                <p data-testid="text-childcare-info">
                  Nursery and children's programs provided
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
