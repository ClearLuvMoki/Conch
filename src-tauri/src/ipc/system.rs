use systemstat::{Platform, System, saturating_sub_bytes};

pub fn getSystemInfo() {
    match sys.memory() {
        Ok(mem) => {
            return saturating_sub_bytes(mem.total, mem.free)
        },
        Err(x) => println!("\nMemory: error: {}", x)
    }
}