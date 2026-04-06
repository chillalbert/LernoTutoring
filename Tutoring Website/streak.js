// streak.js
export async function updateUserStreak() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not found or error:', userError);
      return;
    }
  
    const userUUID = user.id;
  
    const { error } = await supabase.rpc('update_streak', { user_uuid: userUUID });
    if (error) {
      console.error('Error updating streak:', error);
    } else {
      console.log('Streak updated successfully!');
    }
  }
// streak.js
export async function getUserStreak() {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not logged in');
    const { data, error } = await supabase
      .from('streaks')
      .select('current_streak')
      .eq('user_uuid', user.id)
      .single();
    if (error) throw error;
    return data?.current_streak || 0;
  }
  
  

/*
import { updateUserStreak } from './streak.js';

async function onLessonComplete() {
  await updateUserStreak();
  // other logic...
}
WHEN NEEDING TO CALL STREAK, USE THIS CODE.
*/