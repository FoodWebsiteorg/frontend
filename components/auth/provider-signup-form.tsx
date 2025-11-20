"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Cook",
  "Electrician",
  "House maid",
  "Gardener",
  "Cleaner",
  "Pet Care",
  "Driver",
];

export default function ProviderSignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    udyamAadhaar: "",
    age: "",
    gender: "",
    address: "",
    category: "",
    experience: "",
    price: "",
    salaryRange: "",
    availabilityType: "",
    gpsRadius: "",
    skills: "",
    overview: "",
    workType: "",
    emergencyAvailable: false,
  });

  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifyingUdyam, setVerifyingUdyam] = useState(false);

  const handleUdyamVerify = () => {
    if (!formData.udyamAadhaar) {
      setError("Please enter Udyam Aadhaar number");
      return;
    }
    setVerifyingUdyam(true);
    setTimeout(() => {
      setVerifyingUdyam(false);
      alert("Udyam Aadhaar verification initiated (Mock)");
    }, 1000);
  };

  // ⭐ FIXED — Correct backend upload URL
  const handleIdProofUpload = async (file: File) => {
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
        {
          method: "POST",
          body,
        }
      );

      const data = await res.json();
      return data.url;
    } catch (err) {
      throw new Error("Failed to upload ID proof");
    }
  };

  // ⭐ FIXED — Correct backend signup URL
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let idProofUrl = "";
      if (idProofFile) {
        idProofUrl = await handleIdProofUpload(idProofFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup-provider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            idProof: idProofUrl,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        router.push("/login?registered=true&type=provider");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-4 max-h-[600px] overflow-y-auto"
    >
      {/* Udyam Aadhaar */}
      <div className="space-y-2">
        <Label>Udyam Aadhaar No.</Label>
        <div className="flex gap-2">
          <Input
            value={formData.udyamAadhaar}
            onChange={(e) =>
              setFormData({ ...formData, udyamAadhaar: e.target.value })
            }
            required
          />
          <Button type="button" onClick={handleUdyamVerify}>
            {verifyingUdyam ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>

      {/* ID Proof Upload */}
      <div className="space-y-2">
        <Label>Upload ID Proof</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setIdProofFile(e.target.files?.[0] || null)}
          required
        />
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Age</Label>
          <Input
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label>Address</Label>
        <Input
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Service Category</Label>
        <Select
          value={formData.category}
          onValueChange={(v) => setFormData({ ...formData, category: v })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Experience + Price */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Experience (years)</Label>
          <Input
            type="number"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Price per service (₹)</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-2">
        <Label>Salary Range</Label>
        <Input
          value={formData.salaryRange}
          onChange={(e) =>
            setFormData({ ...formData, salaryRange: e.target.value })
          }
        />
      </div>

      {/* Availability Type */}
      <div className="space-y-2">
        <Label>Availability</Label>
        <Select
          value={formData.availabilityType}
          onValueChange={(v) =>
            setFormData({ ...formData, availabilityType: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Type */}
      <div className="space-y-2">
        <Label>Work Type</Label>
        <Select
          value={formData.workType}
          onValueChange={(v) =>
            setFormData({ ...formData, workType: v })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select work type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GPS Radius */}
      <div className="space-y-2">
        <Label>Service Radius (km)</Label>
        <Input
          type="number"
          value={formData.gpsRadius}
          onChange={(e) =>
            setFormData({ ...formData, gpsRadius: e.target.value })
          }
        />
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label>Skills</Label>
        <Input
          value={formData.skills}
          onChange={(e) =>
            setFormData({ ...formData, skills: e.target.value })
          }
          placeholder="Comma-separated skills"
        />
      </div>

      {/* Overview */}
      <div className="space-y-2">
        <Label>Overview</Label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border px-3 py-2"
          value={formData.overview}
          onChange={(e) =>
            setFormData({ ...formData, overview: e.target.value })
          }
        />
      </div>

      {/* Mobile */}
      <div className="space-y-2">
        <Label>Mobile</Label>
        <Input
          type="tel"
          value={formData.mobile}
          onChange={(e) =>
            setFormData({ ...formData, mobile: e.target.value })
          }
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Registering..." : "Register as Provider"}
      </Button>
    </form>
  );
}
