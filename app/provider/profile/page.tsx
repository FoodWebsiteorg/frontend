"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Upload, User, Briefcase, MapPin, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const categories = [
  "Cook",
  "Electrician",
  "House maid",
  "Gardener",
  "Cleaner",
  "Pet Care",
  "Driver",
];

export default function EditProviderProfile() {
  const router = useRouter();
  const { providerId } = useAuthStore();
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [localProviderId, setLocalProviderId] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    age: "",
    gender: "",
    category: "",
    experience: "",
    price: "",
    salaryRange: "",
    availabilityType: "",
    workType: "",
    gpsRadius: "",
    skills: "",
    overview: "",
    emergencyAvailable: false,
    idProof: "",
  });

  // Get providerId from store or localStorage on mount
  useEffect(() => {
    const getProviderId = () => {
      // First try from store
      if (providerId) {
        setLocalProviderId(providerId);
        return;
      }
      
      // Fallback: try from localStorage
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          const id = parsed?.providerId || parsed?.provider?.id;
          if (id) {
            setLocalProviderId(id);
          }
        }
      } catch (err) {
        console.error("Failed to get providerId from localStorage:", err);
      }
    };

    getProviderId();
  }, [providerId]);

  // Fetch profile when localProviderId is available
  useEffect(() => {
    if (localProviderId) {
      fetchProfile(localProviderId);
    }
  }, [localProviderId]);

  const fetchProfile = async (id: number) => {
    setLoading(true);
    
    try {
      console.log("Fetching profile for providerId:", id);
      const res = await fetch(`${baseURL}/api/provider/${id}`);
      
      console.log("Response status:", res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log("Profile data received:", data);
        
        const provider = data.provider;
        
        setFormData({
          name: provider.User?.name || "",
          email: provider.User?.email || "",
          mobile: provider.User?.mobile || "",
          address: provider.User?.address || "",
          age: provider.age?.toString() || "",
          gender: provider.gender || "",
          category: provider.category || "",
          experience: provider.experience?.toString() || "",
          price: provider.price?.toString() || "",
          salaryRange: provider.salaryRange || "",
          availabilityType: provider.availabilityType || "",
          workType: provider.workType || "",
          gpsRadius: provider.gpsRadius?.toString() || "",
          skills: provider.skills || "",
          overview: provider.overview || "",
          emergencyAvailable: provider.emergencyAvailable || false,
          idProof: provider.idProof || "",
        });
        
        if (provider.idProof) {
          setProfileImagePreview(`${provider.idProof}`);
        }
      } else {
        console.error("Failed to fetch profile, status:", res.status);
        toast.error("Failed to load profile");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
      method: "POST",
      body,
    });
    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localProviderId) {
      toast.error("Provider ID not found");
      return;
    }
    
    setSaving(true);

    try {
      let idProofUrl = formData.idProof;
      if (profileImage) {
        idProofUrl = await uploadImage(profileImage);
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        address: formData.address,
        age: parseInt(formData.age) || null,
        gender: formData.gender,
        category: formData.category,
        experience: parseInt(formData.experience) || null,
        price: parseFloat(formData.price) || null,
        salaryRange: formData.salaryRange,
        availabilityType: formData.availabilityType,
        gpsRadius: parseInt(formData.gpsRadius) || null,
        skills: formData.skills,
        overview: formData.overview,
        workType: formData.workType,
        emergencyAvailable: formData.emergencyAvailable,
        idProof: idProofUrl,
      };

      console.log("Updating profile with payload:", payload);

      const res = await fetch(`${baseURL}/api/provider/${localProviderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!", {
          description: "Your changes have been saved.",
        });
      } else {
        const data = await res.json();
        toast.error("Failed to update profile", {
          description: data.error || data.message || "Please try again later.",
        });
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/provider/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your professional information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Proof Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                ID Proof
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden border">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="ID Proof"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="idProof" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                      <Upload className="w-4 h-4" />
                      Upload ID Proof
                    </div>
                  </Label>
                  <Input
                    id="idProof"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Aadhar Card, PAN Card, or Driving License
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(v) => setFormData({ ...formData, gender: v })}
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
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Service (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryRange">Salary Range</Label>
                  <Input
                    id="salaryRange"
                    value={formData.salaryRange}
                    onChange={(e) =>
                      setFormData({ ...formData, salaryRange: e.target.value })
                    }
                    placeholder="e.g., 15000-20000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="e.g., Indian cooking, cleaning, food preparation"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overview">Professional Overview</Label>
                <Textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                  placeholder="Describe your experience and expertise..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location & Availability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Location & Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Your complete address"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gpsRadius">Service Radius (km)</Label>
                  <Input
                    id="gpsRadius"
                    type="number"
                    value={formData.gpsRadius}
                    onChange={(e) =>
                      setFormData({ ...formData, gpsRadius: e.target.value })
                    }
                    placeholder="e.g., 5"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Availability Type</Label>
                  <Select
                    value={formData.availabilityType}
                    onValueChange={(v) =>
                      setFormData({ ...formData, availabilityType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Work Type</Label>
                  <Select
                    value={formData.workType}
                    onValueChange={(v) =>
                      setFormData({ ...formData, workType: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label>Emergency Available</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept emergency/urgent bookings
                  </p>
                </div>
                <Switch
                  checked={formData.emergencyAvailable}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, emergencyAvailable: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 pt-2">
            <Button type="submit" size="lg" disabled={saving}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push("/provider/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}