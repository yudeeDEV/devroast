import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Toggle,
} from "@/components/ui";
import { CodeBlock } from "@/components/ui/code-block";

export default async function ComponentsPage() {
  const buttonCode = `import { Button } from "@/components/ui";

<Button variant="default" size="lg">
  Click me
</Button>`;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Components Demo</h1>

      {/* Button Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Button</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="mt-4">
          <CodeBlock code={buttonCode} language="tsx" />
        </div>
      </section>

      {/* Input Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Input</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Input placeholder="Default input" className="w-64" />
          <Input placeholder="Error input" variant="error" className="w-64" />
        </div>
      </section>

      {/* Toggle Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Toggle</h2>
        <div className="flex gap-4 items-center">
          <Toggle>Toggle</Toggle>
          <Toggle size="sm">Small</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </section>

      {/* Card Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Card</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
          </Card>
          <Card variant="elevated" className="w-64">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>Dark mode variant</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Checkbox Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Checkbox</h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <label htmlFor="terms1" className="text-sm">
              Accept terms
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" defaultChecked />
            <label htmlFor="terms2" className="text-sm">
              Checked
            </label>
          </div>
        </div>
      </section>
    </main>
  );
}
